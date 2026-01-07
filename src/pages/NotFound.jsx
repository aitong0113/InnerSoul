import Card from "../components/common/Card/Card";

const NotFound = () => {
  return (
    <div style={{ maxWidth: "400px", margin: "80px auto", textAlign: "center" }}>
      <Card>
        <h2>404</h2>
        <p>找不到這個頁面</p>
      </Card>
    </div>
  );
};

export default NotFound;
