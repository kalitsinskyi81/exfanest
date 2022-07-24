class Logger {
  private getTimeStamp = (): string => new Date().toISOString();

  public info = (massage: string, ...any: any) => {
    console.log(`[${this.getTimeStamp()} [INFO] ${massage}]`, ...any);
  };
}

const logger = new Logger();

export default logger;
