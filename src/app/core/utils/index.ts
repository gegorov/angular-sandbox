export class Utils {
  static randomChar(): string {
    const dictionary: string = 'abcdefghijklmnopqrstuvwxyz';
    const index: number = Math.floor(Math.random() * (dictionary.length + 1));
    return dictionary[index];
  }
}
