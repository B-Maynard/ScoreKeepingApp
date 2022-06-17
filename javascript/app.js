// Team based scores functions
function teamBasedScoresIncrement(teamCard) {
    // go up two levels of parents, cause the first parent is just the row that the button is in
    let parent = $(teamCard).parent().parent();
    let body = parent.find(".card-body");

    let currentVal = parseInt(body.html());
    body.html(currentVal += 1);
}

function teamBasedScoresDecrement(teamCard) {
    // go up two levels of parents, cause the first parent is just the row that the button is in
    let parent = $(teamCard).parent().parent();
    let body = parent.find(".card-body");

    let currentVal = parseInt(body.html());
    body.html(currentVal -= 1);
}

function addNewTeam() {
    let lastCol = $("#team-container-row").find(".col-lg-4").last();

    let cardHeader = $("#team-container-row").find(".card").last().find(".card-header").html();

    console.log(cardHeader);

    let lastTeamNumberMatch = null;
    if (cardHeader) {
        lastTeamNumberMatch = cardHeader.match(/\d+/);
    }

    let newTeamNumber = 1;

    if (lastTeamNumberMatch) {
        newTeamNumber = parseInt(lastTeamNumberMatch[0]) + 1;
    }

    let newTeamElement = `
    <div class="col-lg-4 col-md-6 col-sm-12">
        <div class="card text-center">
            <div class="card-header h4 text-muted">
                Team ${newTeamNumber}
                <button onclick="removeTeam(this)" class="btn-close float-end fs-5" type="button"></button>
            </div>
            <div class="card-body fs-1 team-score-body" style="background-color: ${generateRandomBackgroundColor()}">
                0
            </div>
            <div class="row">
                <div onclick="teamBasedScoresIncrement(this)" class="col">
                    <div class="pt-2 pb-2 h5 text-muted">
                        <i class="bi bi-caret-up-fill"></i>
                    </div>
                </div>
                <div onclick="teamBasedScoresDecrement(this)" class="col">
                    <div class="pt-2 pb-2 h5 text-muted">
                        <i class="bi bi-caret-down-fill"></i>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `;

    if (cardHeader)
        lastCol.after(newTeamElement);
    else
        $("#team-container-row").append(newTeamElement);
}

function resetScores() {
    $(".card-body").each(function() {
        $(this).html(0);
    });
}

function removeTeam(teamCard) {
    let parent = $(teamCard).parent().parent().parent();

    parent.remove();
}

// Points functions

function removePlayer(removeButtonPressed) {
    let parent = $(removeButtonPressed).parent().parent();
    parent.remove();
}

function updateValues(editButtonPressed) {

    let updateModal = $("#update-modal");
    let currentScoreTag = $(editButtonPressed).parent().parent().find("#score");
    let currentVal = currentScoreTag.html();
    let prom = new Promise(function(resolve, reject) {
        updateModal.modal("show");
        $("#btn-ok-update").click(function() {
            resolve($("#update-input").val());
        });
        $("#btn-cancel-update").click(function() {
            reject();
        });
    }).then(function(val) {
        if (!parseInt(val)) {
            updateModal.modal("hide");
            return;
        }
            
        let radioValue = $("[name='update-radio']:checked").attr("id");

        if (radioValue == "add-radio") {
            let newVal = parseInt(currentVal) + parseInt(val);
            currentScoreTag.html(newVal);
        }
        else {
            let newVal = parseInt(currentVal) - parseInt(val);
            currentScoreTag.html(newVal);
        }

        $("#update-input").val("");
    });
}

function addPlayer() {
    let newPlayerModal = $("#new-player-modal");
    let prom = new Promise(function(resolve, reject) {
        newPlayerModal.modal("show");
        $("#btn-ok").click(function() {
            resolve($("#player-name").val());
        });
        $("#btn-cancel").click(function() {
            reject();
        });
    }).then(function(val) {
        let element = `
        <tr>
            <th class="mw-30" scope="col">${val}</th>
            <th id="score" scope="col">0</th>
            <th scope="col"><i onclick="updateValues(this)" class="bi bi-pencil-square"></i></th>
            <th scope="col"><i onclick="removePlayer(this)" class="bi bi-x-circle-fill"></i></th>
        </tr>
        `;
        $("tbody").append(element);

        $("#player-name").val("");
    });
}

// Utility functions
function generateRandomBackgroundColor() {
    let x = Math.floor(Math.random() * 256);
    let y = Math.floor(Math.random() * 256);
    let z = Math.floor(Math.random() * 256);
    return "rgba(" + x + "," + y + "," + z + "," + 0.5 + ")";
}

