// กำหนดวันที่อัตโนมัติ
    document.getElementById("quote-date").textContent = new Date().toLocaleDateString("th-TH", {
      year: 'numeric', month: 'long', day: 'numeric'
    });

    let rowCount = 0;

    function addRow() {
      rowCount++;
      const tbody = document.getElementById("table-body");
      const row = document.createElement("tr");

      row.innerHTML = `
    <td>${rowCount}</td>
        <td><input type="text" placeholder="ชื่อสินค้า"></td>
        <td><textarea placeholder="รายละเอียดสินค้า" rows="3" style="width: 100%; resize: vertical;"></textarea></td>
        <td><input type="number" value="" min="1" oninput="updateTotal()"></td>
        <td><input type="number" value="" min="0" oninput="updateTotal()"></td>
        <td class="subtotal">0.00</td>
        <td class="no-print"><button onclick="removeRow(this)">ลบ</button></td>
`;

      tbody.appendChild(row);
      updateTotal();
    }

    function updateTotal() {
      const rows = document.querySelectorAll("#table-body tr");
      let total = 0;

      rows.forEach(row => {
        const qty = row.cells[3].querySelector("input").valueAsNumber || 0;
        const price = row.cells[4].querySelector("input").valueAsNumber || 0;
        const subtotal = qty * price;
        row.cells[5].textContent = subtotal.toFixed(2);
        total += subtotal;
      });

      document.getElementById("total").textContent = total.toFixed(2);
    }

    function removeRow(button) {
  const row = button.closest("tr");
  row.remove();
  updateTotal();
  resetRowNumbers(); // ✅ รีเลขลำดับ
}
    function resetRowNumbers() {
  const rows = document.querySelectorAll("#table-body tr");
  rowCount = rows.length; // นับจำนวนแถวที่เหลือ

  rows.forEach((row, index) => {
    row.cells[0].textContent = index + 1; // ลำดับที่ 1, 2, 3...
  });
}
    function downloadPDF() {
  const element = document.getElementById('quote-content');
  const opt = {
    margin:       0.3,
    filename:     `ใบเสนอราคา_${new Date().toLocaleDateString("th-TH")}.pdf`,
    image:        { type: 'jpeg', quality: 0.98 },
    html2canvas:  { scale: 2 },
    jsPDF:        { unit: 'in', format: 'A4', orientation: 'portrait' }
  };

  html2pdf().set(opt).from(element).save();
}
function downloadPDF() {
  const element = document.getElementById('quote-content');

  // ซ่อนปุ่มชั่วคราว
  const buttons = element.querySelectorAll('.no-print');
  buttons.forEach(btn => btn.style.display = 'none');

  //  รอ 0.5 วิ แล้วแปลง PDF
  setTimeout(() => {
    const opt = {
      margin:       0.3,
      filename:     `ใบเสนอราคา_${new Date().toLocaleDateString("th-TH")}.pdf`,
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { scale: 2 },
      jsPDF:        { unit: 'in', format: 'A4', orientation: 'portrait' }
    };

    html2pdf().set(opt).from(element).save().then(() => {
      // แสดงปุ่มคืนหลังแปลงเสร็จ
      buttons.forEach(btn => btn.style.display = '');
    });

  }, 500);
}