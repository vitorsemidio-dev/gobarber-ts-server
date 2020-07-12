export default interface ICacheProvider {
  save(key: string, value: any): Promise<void>;
  recover<T>(key: string): Promise<T>;
  invalidate(key: string): Promise<void>;
}
