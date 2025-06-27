document.addEventListener('DOMContentLoaded', function() {
    const pizarraContainer = document.querySelector('.pizarra-container');
    
 
    const carteles = [
        { ciudad: 'Ciudad 1', fecha: '01-01-0000' },
        { ciudad: 'Ciudad 2', fecha: '01-01-0000' },
        { ciudad: 'Ciudad 3', fecha: '01-01-0000' },
        { ciudad: 'Ciudad 4', fecha: '01-01-0000' },
        { ciudad: 'Ciudad 5', fecha: '01-01-0000' },
        { ciudad: 'Ciudad 6', fecha: '01-01-0000' }
    ];
    

    carteles.forEach((cartel, index) => {
        const cartelElement = document.createElement('div');
        cartelElement.className = 'cartel';
        cartelElement.innerHTML = `
            <h3>${cartel.ciudad}</h3>
            <p>${cartel.fecha}</p>
        `;
        
        const h3Element = cartelElement.querySelector('h3');
        const textoOriginal = cartel.ciudad;
        
        cartelElement.addEventListener('mouseenter', function() {
            h3Element.textContent = 'Ver entradas';
        });
        
        cartelElement.addEventListener('mouseleave', function() {
            h3Element.textContent = textoOriginal;
        });
        
        cartelElement.addEventListener('click', function() {
            console.log(`Seleccionado: ${cartel.ciudad}`);
        });
        
        pizarraContainer.appendChild(cartelElement);
    });
});