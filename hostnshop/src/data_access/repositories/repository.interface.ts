// eslint-disable-next-line @typescript-eslint/no-unused-vars
export interface IRepository<T, K, CreateDTO, EditDTO, ReadDTO> {
  create(data: CreateDTO): Promise<ReadDTO>;
  update(id: K, data: EditDTO): Promise<ReadDTO | null>;
  findOne(id: K): Promise<ReadDTO | null>;
  findAll(): Promise<ReadDTO[]>;
  delete(id: K): Promise<boolean>;
}
