function handleClick(){


    const missionName = this.dataset.missionName
    const launch = launches.find(function(l){
        return l.mission_name === missionName
    });

    console.log(launch);

    const html = `
    <h2>${launch.mission_name}</h2>
    <p>${launch.details} ${launch.links.mission_patch_small}</p>`;

    $modal.html(html).modal();

}