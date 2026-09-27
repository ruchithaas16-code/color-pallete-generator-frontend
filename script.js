const paletteForm =
    document.getElementById("paletteForm");

const paletteNameInput =
    document.getElementById("paletteName");

const colorCountSelect =
    document.getElementById("colorCount");

const paletteResult =
    document.getElementById("paletteResult");

const resultMessage =
    document.getElementById("resultMessage");

const errorMessage =
    document.getElementById("errorMessage");

const saveButton =
    document.getElementById("saveButton");

const savedPalettesContainer =
    document.getElementById("savedPalettes");

const searchInput =
    document.getElementById("searchInput");

const savedCount =
    document.getElementById("savedCount");



let currentPalette = [];


function generateRandomColor() {

    const characters =
        "0123456789ABCDEF";

    let color = "#";


    for (let i = 0; i < 6; i++) {

        const randomIndex =
            Math.floor(
                Math.random() *
                characters.length
            );

        color +=
            characters[randomIndex];
    }


    return color;
}



function createPalette(numberOfColors) {

    const colors = [];


    for (
        let i = 0;
        i < numberOfColors;
        i++
    ) {

        colors.push(
            generateRandomColor()
        );

    }


    return colors;
}


function renderCurrentPalette(colors) {

    paletteResult.innerHTML = "";


    colors.forEach(function (color) {

        const colorBox =
            document.createElement("div");


        colorBox.className =
            "color-box";


        colorBox.style.backgroundColor =
            color;


        colorBox.textContent =
            color;


        paletteResult.appendChild(
            colorBox
        );

    });


    resultMessage.textContent =
        `${colors.length} colors generated successfully.`;
}


function getSavedPalettes() {

    const storedData =
        localStorage.getItem(
            "colorPalettes"
        );


    if (storedData === null) {

        return [];

    }


    return JSON.parse(storedData);
}


function storeSavedPalettes(palettes) {

    localStorage.setItem(
        "colorPalettes",
        JSON.stringify(palettes)
    );
}

function saveCurrentPalette() {

    errorMessage.textContent = "";


    if (currentPalette.length === 0) {

        errorMessage.textContent =
            "Please generate a palette first.";

        return;
    }


    const paletteName =
        paletteNameInput.value.trim();


    if (paletteName === "") {

        errorMessage.textContent =
            "Please enter a palette name.";

        paletteNameInput.focus();

        return;
    }


    const palettes =
        getSavedPalettes();


    const newPalette = {

        id: Date.now(),

        name: paletteName,

        colors: [...currentPalette]

    };


    palettes.push(newPalette);


    storeSavedPalettes(
        palettes
    );


    paletteNameInput.value = "";

    errorMessage.textContent = "";


    renderSavedPalettes();
}



function editPalette(id) {

    const palettes =
        getSavedPalettes();


    const palette =
        palettes.find(
            function (item) {

                return item.id === id;

            }
        );


    if (!palette) {

        return;

    }


    const newName =
        prompt(
            "Enter new palette name:",
            palette.name
        );


    if (newName === null) {

        return;

    }


    const updatedName =
        newName.trim();


    if (updatedName === "") {

        return;

    }


    palette.name =
        updatedName;


    storeSavedPalettes(
        palettes
    );


    renderSavedPalettes();
}


function deletePalette(id) {

    const palettes =
        getSavedPalettes();


    const updatedPalettes =
        palettes.filter(
            function (palette) {

                return palette.id !== id;

            }
        );


    storeSavedPalettes(
        updatedPalettes
    );


    renderSavedPalettes();
}


function renderSavedPalettes() {

    const palettes =
        getSavedPalettes();


    const searchText =
        searchInput.value
            .trim()
            .toLowerCase();


    const filteredPalettes =
        palettes.filter(
            function (palette) {

                return palette.name
                    .toLowerCase()
                    .includes(searchText);

            }
        );


    savedPalettesContainer.innerHTML = "";


    savedCount.textContent =
        `${filteredPalettes.length} palette(s) found`;


    if (filteredPalettes.length === 0) {

        const emptyState =
            document.createElement("div");


        emptyState.className =
            "empty-state";


        const icon =
            document.createElement("div");


        icon.className =
            "empty-icon";


        const heading =
            document.createElement("h3");


        const message =
            document.createElement("p");


        if (palettes.length === 0) {

            icon.textContent = "📁";

            heading.textContent =
                "No Saved Palettes";

            message.textContent =
                "Save a generated palette to see it here.";

        } else {

            icon.textContent = "🔍";

            heading.textContent =
                "No Matching Palettes";

            message.textContent =
                "Try searching with a different name.";

        }


        emptyState.appendChild(icon);

        emptyState.appendChild(heading);

        emptyState.appendChild(message);


        savedPalettesContainer.appendChild(
            emptyState
        );


        return;
    }


    filteredPalettes.forEach(
        function (palette) {

            renderSavedPalette(
                palette
            );

        }
    );
}

function renderSavedPalette(palette) {

    const paletteElement =
        document.createElement("article");


    paletteElement.className =
        "saved-palette";




    const header =
        document.createElement("div");


    header.className =
        "saved-palette-header";



    const title =
        document.createElement("h3");


    title.textContent =
        palette.name;



    const actions =
        document.createElement("div");


    actions.className =
        "palette-actions";



    const editButton =
        document.createElement("button");


    editButton.type =
        "button";


    editButton.className =
        "edit-button";


    editButton.textContent =
        "Edit";


    editButton.addEventListener(
        "click",
        function () {

            editPalette(
                palette.id
            );

        }
    );



    const deleteButton =
        document.createElement("button");


    deleteButton.type =
        "button";


    deleteButton.className =
        "delete-button";


    deleteButton.textContent =
        "Delete";


    deleteButton.addEventListener(
        "click",
        function () {

            deletePalette(
                palette.id
            );

        }
    );


    actions.appendChild(
        editButton
    );


    actions.appendChild(
        deleteButton
    );


    header.appendChild(
        title
    );


    header.appendChild(
        actions
    );


    const colorsContainer =
        document.createElement("div");


    colorsContainer.className =
        "saved-colors";


    palette.colors.forEach(
        function (color) {

            const colorElement =
                document.createElement("div");


            colorElement.className =
                "saved-color";


            colorElement.style.backgroundColor =
                color;


            colorElement.textContent =
                color;


            colorsContainer.appendChild(
                colorElement
            );

        }
    );


    paletteElement.appendChild(
        header
    );


    paletteElement.appendChild(
        colorsContainer
    );


    savedPalettesContainer.appendChild(
        paletteElement
    );
}


paletteForm.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();


        errorMessage.textContent = "";


        const selectedCount =
            colorCountSelect.value;


        if (selectedCount === "") {

            errorMessage.textContent =
                "Please select the number of colors.";

            colorCountSelect.focus();

            return;
        }


        currentPalette =
            createPalette(
                Number(selectedCount)
            );


        renderCurrentPalette(
            currentPalette
        );

    }
);


saveButton.addEventListener(
    "click",
    function () {

        saveCurrentPalette();

    }
);

searchInput.addEventListener(
    "input",
    function () {

        renderSavedPalettes();

    }
);

document.addEventListener(
    "DOMContentLoaded",
    function () {

        renderSavedPalettes();

    }
);