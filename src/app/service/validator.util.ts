export class ValidatorUtil {

  public static readonly login = "Login";
  public static readonly password = "Password";
  public static readonly symbol = "Symbol";

  public static validateAndReturnErrorMessage(field: string, name: string): string {
    if (field == null || field.length == 0) {
      return name + " must not be empty";
    }
    if (field.length < 3) {
      return name + " must be bigger";
    }
    if (field.includes(" ")) {
      return  name + " must not include empty spaces";
    }
    return null;
  }
}
