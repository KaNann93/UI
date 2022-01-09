export default async function FetchData(token) {
  // eslint-disable-next-line no-unused-vars
  const response = await fetch("/purchase", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token,
    }),
  });
  console.log("Response ::: " + response);
  const json = await response.json();
  console.log(json.purchaseOrder);
  return json.purchaseOrder;
}

export async function getCustNameFromServer(custID, setPurchaseCustName) {
  console.log("purchaseCustName");
  const response = await fetch("/purchaseCustName", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      custID,
    }),
  });

  const res = await response.json();
  console.log(res)
  console.log(res.customerName);
  setPurchaseCustName(res.customerName);
}

export async function setPurchaseDetailsIntoDB(p) {
  console.log(p);
  const response = await fetch("/SetPurchaseData", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(p),
  });
}

export async function getUnit(product, setUnitList) {
  console.log(product);
  product = product.toUpperCase();
  if (product.trim().length > 0) {
    const response = await fetch("/getUnit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        product,
      }),
    });
    let res = await response.json();
    res = res.product;
    console.log(res);
    let resp = res?.map(e => { return { unit: e.split("-")[0] } });
    console.log(resp);
    setUnitList(resp);
    return res[0];
  } else { return ""}
}
