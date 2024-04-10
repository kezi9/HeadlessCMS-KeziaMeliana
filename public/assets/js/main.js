async function cards(){
    try {
        // Fetch html classes & ids
        const user = document.querySelector('.profilename')
        const ticketBars = document.querySelectorAll('.ticketbar');
        const listBars = document.querySelectorAll('.rightlist');
        const unresolvedBars = document.getElementById('unresolvedblock');
        const tasksBars = document.querySelector('.tasksblock');

        // Fetch data from content.json
        const response = await fetch("assets/data/content.json");
        const data = await response.json();

        // User Profile
        if (user) {
            user.textContent = data.user.fullName;
        }

        // Card1 (Row of Tickets Blocks)
        ticketBars.forEach((ticketBar, index) => {
            const card1Item = data.card1[index];
            
            // h5 = text
            let text = document.createElement('h5');
            text.className = 'card-title heading1';
            text.innerHTML = `${card1Item.text}`;
            
            // p = count
            let count = document.createElement('p');
            count.className = 'card-text numb-block numbers1';
            count.innerHTML = `${card1Item.count}`;
            
            ticketBar.appendChild(text);
            ticketBar.appendChild(count);
        });

        // Card2 (Today's Trends right card)
        listBars.forEach((rightlist) => {
            data.card2.forEach((card2Item) => {
                let trendsItem = document.createElement('li');
                trendsItem.className = 'list-group-item disabled rightbar';
                trendsItem.setAttribute('aria-disabled', 'true');
                trendsItem.innerHTML = `
                    ${card2Item.text}
                    <p>${card2Item.count}</p>
                `;
                
                rightlist.appendChild(trendsItem);
            });
        });

        // Card3 (Unresolved Tickets & Tasks)
        // Unresolved Ticket
        data.card3[0].unresolvedTickets.forEach((card3Item) => {
            // const card3Item = data.card3.unresolvedTickets[index];
            let unresolvedItem = document.createElement('li');
            unresolvedItem.className = 'list-group-item unresolveblockItems';
            unresolvedItem.innerHTML = `
                ${card3Item.text}
                <span class="text-nowrap text-xs text-muted">${card3Item.count}</span>
            `;

            unresolvedBars.appendChild(unresolvedItem);
        });

        // Tasks
        data.card3[0].tasks.forEach((card3bItem) => {
            let tasksItem = document.createElement('li');
            tasksItem.className = 'list-group-item tasksitem';
            tasksItem.innerHTML = `
                <input class="form-check-input me-1" type="radio" name="listGroupRadio" value="" id="firstRadio">
                <label class="form-check-label" for="firstRadio">${card3bItem.text}</label>
                <span class="badge text-bg-secondary deftext" id="deftext"">${card3bItem.status}</span>
            `;

            tasksBars.appendChild(tasksItem);
        });

    } catch (error) {
        console.log('error:', error);
    }
}

cards();
