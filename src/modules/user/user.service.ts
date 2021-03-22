import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserCreateDto, UserUpdateDto } from 'src/dtos/user.dto';
import environment from 'src/environments/environment';
import { AuditModel } from 'src/models/audit.model';
import { FilterModel } from 'src/models/filter.model';
import { UserModel } from 'src/schemas/user.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {

  constructor(
    @InjectModel('user') private userMongo: Model<UserModel>
  ) { }

  defaultFilterQuery = {
    page: 1,
    size: 10,
    sortBy: '_id',
    sort: 'ASC',
    searchBy: '',
    queryText: ''
  }

  async convertHash(value: string): Promise<string> {
    let hash: any;
    await bcrypt.hash(environment.hashText + value, 10).then(data => {
      hash = data
    })
    return await hash;
  }

  async findAll(query: FilterModel): Promise<any[]> {
    if (Object.keys(query).length !== 0) {
      const count = await this.userMongo.countDocuments({}).exec()
      const newQuery = { ...this.defaultFilterQuery, ...query }
      if (query.queryText && query.searchBy) {
        const data = await this.userMongo
          .find({ [query.searchBy]: query.queryText })
          .limit(Math.max(0, newQuery.size))
          .skip(newQuery.size * (newQuery.page - 1))
          .sort([[newQuery.sortBy, newQuery.sort]])
          .exec()

        return await [{
          total: count,
          page: newQuery.page,
          size: newQuery.size,
          sortBy: newQuery.sortBy,
          sort: newQuery.sort,
          searchBy: newQuery.searchBy,
          queryText: newQuery.queryText,
          data

        }]

      } else {

        const data = await this.userMongo
          .find()
          .limit(Math.max(0, newQuery.size))
          .skip(newQuery.size * (newQuery.page - 1))
          .sort([[newQuery.sortBy, newQuery.sort]])
          .exec()

        return await [{
          total: count,
          page: newQuery.page,
          size: newQuery.size,
          sortBy: newQuery.sortBy,
          sort: newQuery.sort,
          searchBy: newQuery.searchBy,
          queryText: newQuery.queryText,
          data
        }]

      }
    } else {
      const count = await this.userMongo.countDocuments({}).exec()
      const data = await this.userMongo
        .find({}, '-__v')
        .limit(Math.max(0, this.defaultFilterQuery.size))
        .skip(this.defaultFilterQuery.size * (this.defaultFilterQuery.page - 1))
        .sort([[this.defaultFilterQuery.sortBy, this.defaultFilterQuery.sort]])
        .exec()

      return await [{
        total: count,
        page: this.defaultFilterQuery.page,
        size: this.defaultFilterQuery.size,
        sortBy: this.defaultFilterQuery.sortBy,
        sort: this.defaultFilterQuery.sort,
        searchBy: this.defaultFilterQuery.searchBy,
        queryText: this.defaultFilterQuery.queryText,
        data: data
      }]

    }
  }

  async findOne(id: string): Promise<UserModel> {
    return await this.userMongo.findOne({ _id: id }).exec();
  }

  async create(body: UserCreateDto): Promise<UserModel> {
    let audit = new AuditModel();
    audit.active = true;
    audit.createdBy = 'Panel';
    audit.createdDate = new Date();
    body.audit = audit;

    const model = new this.userMongo({ ...body });
    return await model.save();
  }

  async update(id: string, body: UserUpdateDto): Promise<UserModel> {
    let newModel = this.userMongo.findOne({ _id: id }).exec();
    let audit = new AuditModel();

    audit.active = (await newModel).audit.active;
    audit.createdBy = (await newModel).audit.createdBy;
    audit.createdDate = (await newModel).audit.createdDate;
    audit.modifiedBy = 'User';
    audit.modifiedDate = new Date();
    body.audit = audit;

    
    newModel = { ...newModel, ...body };

    return await this.userMongo.findByIdAndUpdate(id, newModel, { new: true }).exec();
  }

  async delete(id: string): Promise<UserModel> {
    return await this.userMongo.findByIdAndRemove({_id: id})
  }

}
