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
        <td><textarea placeholder="รายละเอียดสินค้า" rows="2" style="width: 100%; resize: vertical;"></textarea></td>
        <td><input type="number" value="" min="1" oninput="updateTotal()"></td>
        <td><input type="number" value="" min="0" oninput="updateTotal()"></td>
        <td class="subtotal">0.00</td>
        <td class="no-print"><button onclick="removeRow(this)">ลบ</button></td>
`;

      tbody.appendChild(row);
      updateTotal();
    }

    function formatNumberWithComma(number) {
  return Number(number).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function updateTotal() {
  const rows = document.querySelectorAll("#table-body tr");
  let total = 0;

  rows.forEach(row => {
    const qty = row.cells[3].querySelector("input").valueAsNumber || 0;
    const price = row.cells[4].querySelector("input").valueAsNumber || 0;
    const subtotal = qty * price;
    row.cells[5].textContent = formatNumberWithComma(subtotal);
    total += subtotal;
  });

  document.getElementById("total").textContent = formatNumberWithComma(total);
  document.getElementById("thai-text-total").textContent = convertNumberToThaiText(total);
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
function convertNumberToThaiText(number) {
  number = parseFloat(number).toFixed(2);
  const numberParts = number.split(".");
  const baht = parseInt(numberParts[0], 10);
  const satang = parseInt(numberParts[1], 10);

  const thNum = ["ศูนย์", "หนึ่ง", "สอง", "สาม", "สี่", "ห้า", "หก", "เจ็ด", "แปด", "เก้า"];
  const thDigit = ["", "สิบ", "ร้อย", "พัน", "หมื่น", "แสน", "ล้าน"];

  function readNumber(num) {
    let output = "";
    const numStr = num.toString();
    const len = numStr.length;

    for (let i = 0; i < len; i++) {
      const n = parseInt(numStr.charAt(i), 10);
      if (n !== 0) {
        if (i === len - 1 && n === 1 && len > 1) {
          output += "เอ็ด";
        } else if (i === len - 2 && n === 2) {
          output += "ยี่";
        } else if (i === len - 2 && n === 1) {
          output += "";
        } else {
          output += thNum[n];
        }
        output += thDigit[len - i - 1];
      }
    }
    return output;
  }

  let result = "";
  if (baht > 0) {
    result += readNumber(baht) + "บาท";
  }

  if (satang > 0) {
    result += readNumber(satang) + "สตางค์";
  } else {
    result += "ถ้วน";
  }

  return result;
}
 
