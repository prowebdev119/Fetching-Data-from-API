const yearArray = [2018, 2019, 2020, 2021];

const std_1 = document.getElementById('std_1');
const std_2 = document.getElementById('std_2');
const std_3 = document.getElementById('std_3');
const std_4 = document.getElementById('std_4');
const std_5 = document.getElementById('std_5');
const std_6 = document.getElementById('std_6');
const std_7 = document.getElementById('std_7');

function secoundToHours(given_seconds) {
    hours = Math.floor(given_seconds / 3600);
    minutes = Math.floor((given_seconds - (hours * 3600)) / 60);
    seconds = given_seconds - (hours * 3600) - (minutes * 60);

    timeString = hours.toString().padStart(2, '0') + ':' +
        minutes.toString().padStart(2, '0') + ':' +
        seconds.toString().padStart(2, '0');

    return timeString
}

document.getElementById('button').addEventListener('click', (evene) => {
    document.getElementById('model').classList.remove('hideModel')
    document.getElementById('model').addEventListener('click', () => {
        document.getElementById('model').classList.add('hideModel')
    })
})


async function AssignInitialData() {
    localStorage.setItem('stu_data', JSON.stringify({ 2018: [], 2019: [], 2020: [], 2021: [] }));
    const data = await FetchData(2018);
    const currentdata = await FetchData(2022);
    const stu_data = JSON.parse(localStorage.getItem('stu_data'));
    stu_data[2018] = data;
    stu_data[2022] = currentdata;
    localStorage.setItem('stu_data', JSON.stringify(stu_data));


    for (let i = 1; i <= 7; i++) {
        document.getElementById(`std_cur_${i}`).innerHTML = `${stu_data[2022][i - 1]['name']} ${secoundToHours(stu_data[2022][i - 1]['time'])}`
    }
    for (let i = 1; i <= 7; i++) {
        document.getElementById(`std_${i}`).innerHTML = `${stu_data[2018][i - 1]['name']} ${secoundToHours(stu_data[2018][i - 1]['time'])}`
    }

    yearArray.map(async (item) => {
        const data = await FetchData(item);
        const stu_data = JSON.parse(localStorage.getItem('stu_data'));
        stu_data[item] = data;
        localStorage.setItem('stu_data', JSON.stringify(stu_data));
        return item;
    })

    setInterval(() => {
        var currentDay = new Date();
        var securrentSecound = currentDay.getSeconds() + (60 * (currentDay.getMinutes() + (60 * currentDay.getHours())));
        document.getElementById('timer').innerHTML = `${secoundToHours(86400 - securrentSecound)}`
    }, 1000)

}


async function FetchData(year) {
    const responce = await fetch(`https://introweb.tech/cse134-final/fake-data.php/?year=${year}`);
    const data = await responce.json();
    data.sort(function (a, b) { return a.time - b.time; });
    return data;
}

async function selectOption(event) {
    const stu_data = JSON.parse(localStorage.getItem('stu_data'));
    if (stu_data[event.target.value].length == 0) {
        const data = await FetchData(event.target.value);
        stu_data[event.target.value] = data;
        localStorage.setItem('stu_data', JSON.stringify(stu_data));
    }
    for (let i = 1; i <= 7; i++) {
        document.getElementById(`std_${i}`).innerHTML = `${stu_data[event.target.value][i - 1]['name']} ${secoundToHours(stu_data[event.target.value][i - 1]['time'])}`
    }
}

AssignInitialData();