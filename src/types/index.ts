type MODE = 'development' | 'production';

export interface IEnv {
  mode: MODE;
  port: number;
}
