const stockApi = {
        getProductList: async () => {
        console.log("GetProductList");
        const response = await fetch("/getProductList", {
            method: "POST",
            headers: {
                "Content-Type" : "application/json"
            },
        });
        const productList = await response.json();
        console.log("Stock API line 11"+ productList);
        //setStockList(productList);
        return productList;
        //console.log(parseInt(productList.productList[0].Qty));
    },

    debaseStore: async (storeOutList) => {
      console.log(storeOutList);
      const response = await fetch("/debaseStore", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({storeOutList}),
      });
      console.log(response);
    },

    getUncookedProductList: async () => {
      const response = await fetch("/uncookedStock", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
      });
      const uncookedProductList = await response.json();
      console.log(uncookedProductList);
      return uncookedProductList;
    }
}

export default stockApi;


/**
 * 
 * 
 * <span>{parseInt(prod.Qty)}</span>
               


const data = [
  {
    key: '1',
    product: 'John Brown',
    qty: 32,
    address: 'New York No. 1 Lake Park',
  },
  {
    key: '2',
    product: 'Joe Black',
    qty: 42,
    address: 'London No. 1 Lake Park',
  },
  {
    key: '3',
    product: 'Jim Green',
    qty: 32,
    address: 'Sidney No. 1 Lake Park',
  },
  {
    key: '4',
    product: 'Jim Red',
    qty: 32,
    address: 'London No. 2 Lake Park',
  },
];
 */