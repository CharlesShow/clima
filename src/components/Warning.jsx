import "../css/Warning.css";

function Warning({ codRes }) {
  return (
    <div id="warning">
      {codRes == 404 && (
        <h2 className="city_not_found">
          <i class="fa-solid fa-triangle-exclamation" id="warning_icon_404"></i>{" "}
          Cidade não encontrada.
        </h2>
      )}
    </div>
  );
}

export default Warning;
