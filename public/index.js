function initializeInventory() {
  let savedInventory = localStorage.getItem("tireInventory");
  if (savedInventory) {
    return JSON.parse(savedInventory);
  } else {
    return [];
  }
}

// Initialize tire inventory on page load
let tireInventory = initializeInventory();
let tiresSold = JSON.parse(localStorage.getItem("tiresSold")) || [];

// Function to add tires to inventory
function addTires() {
  let brand = document.getElementById("brand").value.trim();
  let quantity = parseInt(document.getElementById("quantity").value);
  let width = parseInt(document.getElementById("width").value);
  let aspectRatio = parseInt(document.getElementById("aspectRatio").value);
  let rimDiameter = parseInt(document.getElementById("rimDiameter").value);

  if (
    brand &&
    !isNaN(quantity) &&
    !isNaN(width) &&
    !isNaN(aspectRatio) &&
    !isNaN(rimDiameter)
  ) {
    // Calculate tire size
    let size = `${width}/${aspectRatio}R${rimDiameter}`;

    // Prepare formData object
    const formData = {
      brand: brand,
      quantity: quantity,
      width: width,
      aspectRatio: aspectRatio,
      rimDiameter: rimDiameter,
      size: size,
    };

    // Send POST request to save tire inventory
    fetch("/api/save-tire-inventory", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to save tire inventory");
        }
        return response.text();
      })
      .then((data) => {
        console.log(data);
        alert(data); // Show success message
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Failed to save tire inventory"); // Show error message
      });

    clearInputs(); // Clear input fields after adding tires
  } else {
    alert("Please fill all fields with valid values.");
  }
}

// Function to sell tires from inventory
function sellTires() {
    let brand = document.getElementById("sellBrand").value.trim();
    let quantity = parseInt(document.getElementById("sellQuantity").value);
    let width = parseInt(document.getElementById("sellWidth").value);
    let aspectRatio = parseInt(document.getElementById("sellAspectRatio").value);
    let rimDiameter = parseInt(document.getElementById("sellRimDiameter").value);
    let sellNotes = document.getElementById("sellNotes").value.trim(); // Parse as string, not integer

    if (
        brand &&
        !isNaN(quantity) &&
        !isNaN(width) &&
        !isNaN(aspectRatio) &&
        !isNaN(rimDiameter)
    ) {
        // Calculate tire size
        let size = `${width}/${aspectRatio}R${rimDiameter}`;

        // Prepare formData object
        const formData = {
            brand: brand,
            quantity: quantity,
            width: width,
            aspectRatio: aspectRatio,
            rimDiameter: rimDiameter,
            size: size,
            sellNotes: sellNotes
        };

        // Send POST request to save sold tires
        fetch('/api/save-sold-tires', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to save sold tires data');
            }
            return response.text();
        })
        .then(data => {
            console.log(data);
            alert(data); // Show success message
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Failed to save sold tires data'); // Show error message
        });

        clearInputs(); // Clear input fields after selling tires
    } else {
        alert("Please fill all fields with valid values.");
    }
}

// Function to display current inventory
function displayInventory() {
    let inventoryBody = document.getElementById("inventoryBody");
    inventoryBody.innerHTML = "";

    tireInventory.forEach((tire) => {
        let row = document.createElement("tr");
        row.innerHTML = `
            <td>${tire.brand}</td>
            <td>${tire.quantity}</td>
            <td>${tire.size}</td>
        `;
        inventoryBody.appendChild(row);
    });
}


// Function to display sold tires
function displayTiresSold() {
    let tiresSoldDiv = document.getElementById("tiresSold");
    tiresSoldDiv.innerHTML = "";

    tiresSold.forEach((tire) => {
        let div = document.createElement("div");
        div.textContent = `${tire.quantity} ${tire.brand} ${tire.size} tires sold`;
        if (tire.sellNotes) {
            div.textContent += `, Notes: ${tire.sellNotes}`; // Include notes if they exist
        }
        tiresSoldDiv.appendChild(div);
    });
}


// Function to clear input fields
function clearInputs() {
  document.getElementById("brand").value = "";
  document.getElementById("quantity").value = "";
  document.getElementById("width").value = "";
  document.getElementById("aspectRatio").value = "";
  document.getElementById("rimDiameter").value = "";
  document.getElementById("sellBrand").value = "";
  document.getElementById("sellQuantity").value = "";
  document.getElementById("sellWidth").value = "";
  document.getElementById("sellAspectRatio").value = "";
  document.getElementById("sellRimDiameter").value = "";
  document.getElementById("sellNotes").value = ""; // Clear sellNotes input field
}

// Display initial inventory and sold tires co
displayInventory();
displayTiresSold();
