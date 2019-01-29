package top.ingxx.manager.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import com.alibaba.dubbo.config.annotation.Service;
import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;
import top.ingxx.mapper.TbSpecificationMapper;
import top.ingxx.mapper.TbSpecificationOptionMapper;
import top.ingxx.pojo.TbSpecification;
import top.ingxx.pojo.TbSpecificationExample;
import top.ingxx.pojo.TbSpecificationExample.Criteria;
import top.ingxx.manager.service.SpecificationService;

import top.ingxx.pojo.TbSpecificationOption;
import top.ingxx.pojoGroup.Specification;
import top.ingxx.untils.entity.PageResult;

/**
 * 服务实现层
 *
 * @author Administrator
 */
@Service
public class SpecificationServiceImpl implements SpecificationService {

    @Autowired
    private TbSpecificationMapper specificationMapper;
    @Autowired
    private TbSpecificationOptionMapper specificationOptionMapper;

    /**
     * 查询全部
     */
    @Override
    public List<TbSpecification> findAll() {
        return specificationMapper.selectByExample(null);
    }

    /**
     * 按分页查询
     */
    @Override
    public PageResult findPage(int pageNum, int pageSize) {
        PageHelper.startPage(pageNum, pageSize);
        Page<TbSpecification> page = (Page<TbSpecification>) specificationMapper.selectByExample(null);
        return new PageResult(page.getTotal(), page.getResult());
    }

    /**
     * 增加
     */
    @Override
    public void add(Specification specification) {
        //获取规格
        TbSpecification tbSpecification = specification.getSpecification();
        //插入规格
        specificationMapper.insert(tbSpecification);
        //遍历规格数组
        for (TbSpecificationOption tbSpecificationOption : specification.getSpecificationOptionList()) {
            //设置规格id
            tbSpecificationOption.setSpecId(tbSpecification.getId());
            specificationOptionMapper.insert(tbSpecificationOption);
        }
    }


    /**
     * 修改
     */
    @Override
    public void update(TbSpecification specification) {
        specificationMapper.updateByPrimaryKey(specification);
    }

    /**
     * 根据ID获取实体
     *
     * @param id
     * @return
     */
    @Override
    public TbSpecification findOne(Long id) {
        return specificationMapper.selectByPrimaryKey(id);
    }

    /**
     * 批量删除
     */
    @Override
    public void delete(Long[] ids) {
        for (Long id : ids) {
            specificationMapper.deleteByPrimaryKey(id);
        }
    }


    @Override
    public PageResult findPage(TbSpecification specification, int pageNum, int pageSize) {
        PageHelper.startPage(pageNum, pageSize);

        TbSpecificationExample example = new TbSpecificationExample();
        Criteria criteria = example.createCriteria();

        if (specification != null) {
            if (specification.getSpecName() != null && specification.getSpecName().length() > 0) {
                criteria.andSpecNameLike("%" + specification.getSpecName() + "%");
            }

        }

        Page<TbSpecification> page = (Page<TbSpecification>) specificationMapper.selectByExample(example);
        return new PageResult(page.getTotal(), page.getResult());
    }

}