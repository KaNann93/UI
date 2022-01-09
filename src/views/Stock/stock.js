import React, { useState, useEffect } from "react";
import { TextField } from "@material-ui/core";
import ButtonDropDown from 'components/Select/ButtonDropDown';
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
//import Tabs from '@material-ui/core/Tabs';
//import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { Table, Input, Button, Space } from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';

import 'assets/Semantic-UI-CSS-master/semantic.css';
import { Tabs } from 'antd';
import { Tab } from 'semantic-ui-react'
import './stock.css';
import 'antd/dist/antd.css';
import stockApi from "./stockAPI.js";

const { TabPane } = Tabs;

export default function Stock() {
  const [productObj, setProductObj] = useState({});
  const [state, setState] = useState([]);
  //const [stockList, setStockList] = useState([]);
  const [stockList, setStockList] = useState(['PList', 'QList']);
  const [uncookedList, setUncookedList] = useState(['PList', 'QList']);
  let searchInput;
  //stockApi.getProductList(setStockList);
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setState({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex,
    });
  };

  const handleReset = clearFilters => {
    clearFilters();
    setState({ searchText: '' });
  };

  const getProductCurrentQty = (productMapping, index, x, itemDetails) => {
    console.log(productMapping);
    //console.log(xb)
  }
  const debase = async (e) => {
    //console.log(storeOutList[0]);
    //console.log(currentStockList);
    //productObj
    if (storeOutList.length > 0) {
      storeOutList.map((itemDetails, index) => {
        console.log(productObj);
        console.log(itemDetails);
        let productCurrentQty = productObj[itemDetails[0]][itemDetails[2]];
        console.log("Current Stock ::: " + productCurrentQty);
        console.log("Debase Stock ::: " + itemDetails[1]);
        console.log("New Stock ::: " + (productCurrentQty - itemDetails[1]));

        // currentStockList.filter((ele)=>{
        //   console.log(ele[itemDetails[0]],itemDetails[0]);
        //    return ele[itemDetails[0]]!=undefined;
        // });
        console.log(productCurrentQty);
        // getProductCurrentQty,index, itemDetails);
        //console.log(currentStockList);
        // currentStockList[itemDetails[0]].map(e => {
        //   console.log(e["box"]);
        // });
      })
      await stockApi.debaseStore(storeOutList);
      setStoreOutList([]);
    } else alert("Debase list is empty")
  }

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setState({
                searchText: selectedKeys[0],
                searchedColumn: dataIndex,
              });
            }}
          >
            Filter
          </Button>
        </Space>
      </div>
    ),
    filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
        : '',
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => searchInput.select(), 100);
      }
    },
    render: text =>
      state.searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[state.searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });
  const [storeOutList, setStoreOutList] = useState([]); //["Egg", "1", "crate"]
  const [currentStockList, setCurrentStockList] = useState([]);

  const storeOutQty = (e, index, productName) => {
    let debaseList = storeOutList;
    let debase = debaseList[index];
    if (debase !== undefined) {
      debase[1] = e.target.value;
    } else {
      debase = [productName, e.target.value];
    }
    debaseList[index] = debase;
    setStoreOutList(debaseList);
  }
  const storeOutUnit = (e, index) => {
    let debaseList = storeOutList;
    console.log(debaseList);
    let debase = debaseList[index];
    if (debase === undefined) {
      let dList = [];
      dList[2] = e.target.value;
      debaseList[index] = dList;
    } else {
      debase[2] = e.target.value;
      debaseList[index] = debase;
    }
    setStoreOutList(debaseList);
  }

  const storeCurrentStock = (prod) => {
    let currStock = currentStockList;
    currStock.push({
      [prod.name]: prod.Unit.map((e, index) => {
        let unit = e.split("-")[0];
        let qty = Math.round(e.split("-")[1] * prod.Qty);
        let arr = [];
        arr[unit] = qty;
        //currStock[prod.name] = {[unit] : qty};Qty
        return { [unit]: Math.round(qty) };
      })
    });
    setCurrentStockList(currStock);
    console.log(currStock);
  }

  const PList = async () => {
    let productList = await stockApi.getProductList();
    console.log(productList);
    let productObjTemp = {};
    productList.productList.forEach(ele => {
      console.log(ele)
      productObjTemp[ele.name] = ((ele) => {
        let unitObj = {};
        ele.Unit.forEach((unit) => {
          let qnty = Math.round((ele.Qty / unit.split("-")[1]) * 100) / 100;
          console.log(qnty);
          unitObj[unit.split("-")[0]] = qnty;
        })
        return unitObj;
      })(ele);
    });
    setProductObj(productObjTemp);
    console.log(productObjTemp);
    let stockRow = productList.productList.map((prod, index) => {
      let prodUnit = prod.Unit.map(proNit => {
        console.log((prod.Qty / proNit.split("-")[1]) + " " + proNit.split("-")[0] + "-" + index);
        return Math.round((prod.Qty / proNit.split("-")[1])*100)/100 + " " + proNit.split("-")[0] + "-" + index;
      })
      storeCurrentStock(prod, index);
      return {
        key: index,
        product: prod.name,
        qty: <><ButtonDropDown
          style={{ minWidth: "auto", verticalAlign: "baseline", margin: "0px" }}
          options={prodUnit}
          key={index}
          defUnit={prodUnit[0].split("-")[0]}
          onChange={() => { }}
        /></>,
        storeOut: [<>
          <TextField
            style={{ verticalAlign: "inherit" }}
            type="number"
            //pattern="[0-9]{3}"
            //type="text"
            inputProps={{ min: "1", max: "100" }} 
            //inputProps={{ maxLength: 12 }}
            onChange={(e) => storeOutQty(e, index, prod.name)}
            index={index}
          />
          <ButtonDropDown
            style={{ minWidth: "auto", verticalAlign: "baseline", margin: "0px" }}
            options={prod.Unit}
            index={index}
            defUnit=''
            onChange={(e) => storeOutUnit(e, index)}
          /></>],

      }
    })
    console.log(stockRow);
    setStockList(stockRow);
  }

  const UncookedProdunctList = async () => {
    let uncookedProductList = await stockApi.getUncookedProductList();
    console.log(uncookedProductList.uncookedProductList);
    let uncookedStockRow = uncookedProductList.uncookedProductList.map((ele, index) => {
      console.log(ele);
      let prod = ele.split("=")
      return {
        key: index,
        product: prod[0],
        qty: prod[1],
        /*<><ButtonDropDown
          style={{ minWidth: "auto", verticalAlign: "baseline", margin: "0px" }}
          options={prod[1]}
          key={index}
          // defUnit={prodUnit[0].split("-")[0]}
          onChange={() => { }}
        /></>,*/

      }
    })
    console.log(uncookedStockRow);
    setUncookedList(uncookedStockRow);
  }

  useEffect(() => {
    PList();
    UncookedProdunctList();
  }, []);

  const storeColumns = [
    {
      title: 'Product',
      dataIndex: 'product',
      key: 'product',
      width: '30%',
      ...getColumnSearchProps('product'),
    },
    {
      title: 'Qty.',
      dataIndex: 'qty',
      key: 'qty',
      width: '20%',
      ...getColumnSearchProps('qty'),
    },
    {
      title: <><span
        style={{ verticalAlign: "-webkit-baseline-middle" }}
      >Store Out</span>
        <Button
          style={{ float: "right" }}
          onClick={debase}>Debase</Button></>,
      dataIndex: 'storeOut',
      key: 'storeOut',
    }
  ];

  const uncookedColumns = [
    {
      title: 'Product',
      dataIndex: 'product',
      key: 'product',
      width: '30%',
      ...getColumnSearchProps('product'),
    },
    {
      title: 'Qty.',
      dataIndex: 'qty',
      key: 'qty',
      width: '20%',
      ...getColumnSearchProps('qty'),
    }
  ];

  return (
    <Tab panes={[
      { menuItem: 'Store Stock', pane: [<Table columns={storeColumns} dataSource={stockList} />] },
      { menuItem: 'Uncooked Stock', pane: [<Table columns={uncookedColumns} dataSource={uncookedList} />] },
      { menuItem: 'Cooked Stock', pane: 'Tab 2 Content' },
    ]} renderActiveOnly={false} />
  );
}

/**
 *

 */