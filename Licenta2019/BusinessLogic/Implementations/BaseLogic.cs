using System;

namespace BusinessLogic.Implementations
{
    using DataAccess.Abstractions;

    public class BaseLogic
    {
        protected readonly IRepository _repository;

        public BaseLogic(IRepository repository)
        {
            _repository = repository ?? throw new ArgumentNullException();
        }
    }
}
