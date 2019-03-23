using System;
using System.Text.RegularExpressions;

namespace BusinessLogic.Validators
{
    public static class BaseValidator
    {
        public static bool IsGuid(Guid candidate)
        {
            Regex isGuid = new Regex(@"^(\{){0,1}[0-9a-fA-F]{8}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{12}(\}){0,1}$", RegexOptions.Compiled);

            if (isGuid.IsMatch(candidate.ToString()))
            {
                return true;
            }

            return false;
        }
    }
}
