export const list = (count: number) => {
  return Array.apply(null, new Array(count)).map((e, i) => (
    <div
      key={i}
      style={{ margin: 10, width: 120, height: 20, backgroundColor: "orange" }}
    ></div>
  ));
};
export const card = (count: number) => {
  return Array.apply(null, new Array(count)).map((e, i) => (
    <div
      key={i}
      style={{ margin: 10, width: 120, height: 120, backgroundColor: "yellow" }}
    ></div>
  ));
};
