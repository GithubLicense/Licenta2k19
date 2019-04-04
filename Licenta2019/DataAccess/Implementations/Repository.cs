using System;
using System.Collections.Generic;

namespace DataAccess.Implementations
{
    using System.Linq;
    using System.Linq.Expressions;

    using DataAccess.Abstractions;

    using Entities;

    public class Repository : IRepository
    {
        private readonly ApplicationDbContext _context;

        public Repository(ApplicationDbContext context)
        {
            _context = context;
        }

        public void Insert<T>(T entity)
            where T : BaseEntity
        {
            _context.Set<T>().Add(entity);
        }

        public T GetLastByFilter<T>(Expression<Func<T, bool>> filter)
            where T : BaseEntity
        {
            return _context.Set<T>().FirstOrDefault(filter);
        }

        public ICollection<T> GetAllByFilter<T>(Expression<Func<T, bool>> filter) where T : BaseEntity
        {
            return _context.Set<T>().Where(filter).ToList();
        }

        public ICollection<T> GetAll<T>()
            where T : BaseEntity
        {
            return _context.Set<T>().ToList();
        }

        public void Delete<T>(T entity) 
            where T : BaseEntity
        {
            _context.Set<T>().Remove(entity);
        }

        public void Update<T>(T entity)
            where T : BaseEntity
        {
            _context.Set<T>().Update(entity);
        }

        public void Save()
        {
            _context.SaveChanges();
        }
    }
}
