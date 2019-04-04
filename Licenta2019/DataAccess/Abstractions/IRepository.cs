using System;
using System.Collections.Generic;

namespace DataAccess.Abstractions
{
    using System.Linq.Expressions;

    using Entities;

    public interface IRepository
    {
        void Insert<T>(T entity)
            where T : BaseEntity;

        void Update<T>(T entity)
            where T : BaseEntity;

        T GetLastByFilter<T>(Expression<Func<T, bool>> filter)
            where T : BaseEntity;

        ICollection<T> GetAllByFilter<T>(Expression<Func<T, bool>> filter)
            where T : BaseEntity; 

        ICollection<T> GetAll<T>()
            where T : BaseEntity;

        void Delete<T>(T entity)
            where T : BaseEntity;

        void Save();
    }
}
