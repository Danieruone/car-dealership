import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { Brand } from './entities/brand.entity';
import { CreateBrandDto, UpdateBrandDto } from './dto';

@Injectable()
export class BrandsService {
  private brands: Brand[] = [
    { id: uuid(), name: 'Toyota', createdAt: new Date().getTime() },
  ];

  create(createBrandDto: CreateBrandDto) {
    const brand: Brand = {
      id: uuid(),
      name: createBrandDto.name.toLocaleLowerCase(),
      createdAt: new Date().getTime(),
    };
    this.brands.push(brand);
    return brand;
  }

  findAll() {
    return this.brands;
  }

  findOne(id: string) {
    const brand = this.brands.find((brand) => brand.id === id);
    if (!brand) throw new NotFoundException(`Brand with ${id} not found`);
    return brand;
  }

  update(id: string, updateBrandDto: UpdateBrandDto) {
    let brandDB = this.findOne(id);
    this.brands = this.brands.map((brand) => {
      if (brand.id === id) {
        brandDB = {
          ...brandDB,
          ...updateBrandDto,
          id,
          updatedAt: new Date().getTime(),
        };
        return brandDB;
      }
      return brand;
    });
    return brandDB;
  }

  remove(id: string) {
    const brand = this.findOne(id);
    this.brands = this.brands.filter((brand) => brand.id !== id);
    return brand;
  }
}
