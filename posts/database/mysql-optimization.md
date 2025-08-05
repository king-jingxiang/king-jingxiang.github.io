---
title: MySQL性能优化实战指南
date: 2024-01-10
tags: [MySQL, 数据库优化, 索引, 性能调优]
category: 数据库
---

# MySQL性能优化实战指南

数据库性能优化是后端开发中的重要技能。本文将详细介绍MySQL性能优化的各种技巧和最佳实践。

## 索引优化

### 创建合适的索引
```sql
-- 单列索引
CREATE INDEX idx_user_email ON users(email);

-- 复合索引
CREATE INDEX idx_user_status_created ON users(status, created_at);

-- 唯一索引
CREATE UNIQUE INDEX idx_user_username ON users(username);
```

### 索引使用原则
1. **最左前缀原则**
2. **避免在索引列上使用函数**
3. **选择性高的列优先**

## 查询优化

### EXPLAIN分析
```sql
EXPLAIN SELECT * FROM users 
WHERE status = 'active' 
AND created_at > '2024-01-01';
```

### 避免全表扫描
```sql
-- 不好的查询
SELECT * FROM users WHERE YEAR(created_at) = 2024;

-- 优化后的查询
SELECT * FROM users 
WHERE created_at >= '2024-01-01' 
AND created_at < '2025-01-01';
```

## 配置优化

### 关键参数调优
```ini
# my.cnf配置示例
[mysqld]
innodb_buffer_pool_size = 1G
innodb_log_file_size = 256M
query_cache_size = 128M
max_connections = 200
```

### 监控指标
- 慢查询日志
- 连接数监控
- 缓存命中率
- 锁等待时间

## 架构优化

### 读写分离
```python
# Django数据库路由示例
class DatabaseRouter:
    def db_for_read(self, model, **hints):
        return 'slave'
    
    def db_for_write(self, model, **hints):
        return 'master'
```

### 分库分表
- 垂直分库：按业务模块
- 水平分表：按数据量

## 实战案例

### 慢查询优化
1. **识别慢查询**
2. **分析执行计划**
3. **添加合适索引**
4. **重写查询语句**

通过系统性的优化，可以显著提升MySQL数据库的性能表现。