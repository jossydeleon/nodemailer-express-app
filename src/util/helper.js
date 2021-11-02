exports.generateHtml = function (name) {
  return `
      <div style="background-color:#000; background:#000; padding:30px; ">
        <p><h4 style="color:#FFF; text-align:center;">Item ${name} is out of stock. Please check your inventory</h4></p>
      </p>
      </div>
        `;
};
