export type ServerActionResult<T> = T | { error: true; error: string };

export class ServerActionError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ServerActionError";
  }
}

export function createServerAction<Return, Args extends unknown[] = []>(
  callback: (...args: Args) => Promise<Return>
): (...args: Args) => Promise<ServerActionResult<Return>> {
  return async (...args: Args) => {
    try {
      const value = await callback(...args);
      return value;
    } catch (error) {
      if (error instanceof ServerActionError)
        return { error: true, error: error.message };
      throw error;
    }
  };
}
