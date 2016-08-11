package dao.mapper.connectionManage;

import core.plugin.mybatis.annotation.MapperMaker;
import model.connectionManage.ConnectionManage;

import java.util.List;

/**
 * Created by yx on 16/8/11.
 */
@MapperMaker
public interface ConnectionManageMapper {
    int add(ConnectionManage connectionManage);

    int delete(ConnectionManage connectionManage);

    List<ConnectionManage> query(ConnectionManage connectionManage);
}