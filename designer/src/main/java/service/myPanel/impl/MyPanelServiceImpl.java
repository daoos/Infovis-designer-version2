/*************************************************************************
 * Copyright (C) Unpublished JiuDaoTech Software, Inc. All rights reserved.
 * JiuDaoTech Software, Inc., Confidential and Proprietary.
 * <p>
 * This software is subject to copyright protection
 * under the laws of the Public of China and other countries.
 * <p>
 * Unless otherwise explicitly stated, this software is provided
 * by JiuDaoTech "AS IS".
 *************************************************************************/
package service.myPanel.impl;

import dao.BaseMapper;
import model.myPanel.MyCharts;
import model.myPanel.MyPanel;
import model.myPanel.PanelChartsWrapper;
import org.joda.time.DateTime;
import org.springframework.stereotype.Service;
import service.myPanel.MyPanelService;
import service.myPanel.PanelChartsWrapperService;

import javax.annotation.Resource;
import java.util.List;
import java.util.UUID;

/**
 * Created by ct on 2016/8/23.
 */
@Service
public class MyPanelServiceImpl implements MyPanelService {

    private static final String NAMESPACE = MyPanel.class.getName();
    @Resource
    private BaseMapper<MyPanel> baseMapper;

    @Resource
    private PanelChartsWrapperService panelChartsWrapperService;

    @Override
    public MyPanel queryAsObject(String exportId) throws Exception {
        MyPanel myPanel = new MyPanel();
        myPanel.setExportId(exportId);
        myPanel.setStatmentId(NAMESPACE + ".selectOne");
        return baseMapper.selectOne(myPanel);
    }

    @Override
    public List<MyPanel> queryAsList(MyPanel myPanel) throws Exception {
        myPanel.setStatmentId(NAMESPACE + ".selectList");
        return baseMapper.selectList(myPanel);
    }


    @Override
    public String insert(MyPanel myPanel) throws Exception {
        String exportId = UUID.randomUUID().toString();
        myPanel.setExportId(exportId);
        myPanel.setCreateTime(DateTime.now().toString("yyyyMMddHHmmss"));
        myPanel.setUpdateTime(DateTime.now().toString("yyyyMMddHHmmss"));
        myPanel.setStatmentId(NAMESPACE + ".insert");
        baseMapper.insert(myPanel);

        return exportId;
    }

    @Override
    public int update(MyPanel myPanel) throws Exception {
        myPanel.setUpdateTime(DateTime.now().toString("yyyyMMddHHmmss"));
        myPanel.setStatmentId(NAMESPACE + ".update");
        return baseMapper.update(myPanel);
    }


    @Override
    public int delete(String exportId) throws Exception {
        PanelChartsWrapper panelChartsWrapper = new PanelChartsWrapper();
        panelChartsWrapper.setExportId(exportId);
        panelChartsWrapperService.delete(panelChartsWrapper);
        MyPanel myPanel = new MyPanel();
        myPanel.setExportId(exportId);
        myPanel.setStatmentId(NAMESPACE + ".delete");
        return baseMapper.delete(myPanel);
    }
}
