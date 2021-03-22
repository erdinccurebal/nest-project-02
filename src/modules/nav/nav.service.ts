import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuditModel } from 'src/models/audit.model';
import { FilterModel } from 'src/models/filter.model';
import { NavModel } from 'src/schemas/nav.schema';
import { NavCreateDto, NavUpdateDto } from '../../dtos/nav.dto';

@Injectable()
export class NavService {

  constructor(
    @InjectModel('nav') private navMongo: Model<NavModel>
  ) { }

  defaultFilterQuery = {
    page: 1,
    size: 10,
    sortBy: '_id',
    sort: 'ASC',
    searchBy: '',
    queryText: ''
  }

  async findAll(query: FilterModel): Promise<any[]> {
    if (Object.keys(query).length !== 0) {
      const count = await this.navMongo.countDocuments({}).exec()
      const newQuery = { ...this.defaultFilterQuery, ...query }
      if (query.queryText && query.searchBy) {
        const data = await this.navMongo
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

        const data = await this.navMongo
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
      const count = await this.navMongo.countDocuments({}).exec()
      const data = await this.navMongo
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

  async findOne(id: string): Promise<NavModel> {
    return await this.navMongo.findOne({ _id: id }).exec();
  }

  async create(body: NavCreateDto): Promise<NavModel> {
    let audit = new AuditModel();
    audit.active = true;
    audit.createdBy = 'Panel';
    audit.createdDate = new Date();
    body.audit = audit;

    const model = new this.navMongo({ ...body });
    return await model.save();
  }

  async update(id: string, body: NavUpdateDto): Promise<NavModel> {
    let newModel = this.navMongo.findOne({ _id: id }).exec();
    let audit = new AuditModel();

    audit.active = (await newModel).audit.active;
    audit.createdBy = (await newModel).audit.createdBy;
    audit.createdDate = (await newModel).audit.createdDate;
    audit.modifiedBy = 'User';
    audit.modifiedDate = new Date();
    body.audit = audit;

    
    newModel = { ...newModel, ...body };

    return await this.navMongo.findByIdAndUpdate(id, newModel, { new: true }).exec();
  }

  async delete(id: string): Promise<NavModel> {
    return await this.navMongo.findByIdAndRemove({_id: id})
  }

}
