document.addEventListener('DOMContentLoaded', function() {
    const albumCards = document.querySelectorAll('.album-card');
    const container = document.querySelector('.main-container');
    const albumsGrid = document.querySelector('.albums-grid');
    const filterCheckboxes = document.querySelectorAll('input[type="checkbox"]');
    
    const infoCoverImg = document.getElementById('info-cover-img');
    const infoTitle = document.getElementById('info-title');
    const infoDescription = document.getElementById('info-description');
    
    let isDragging = false;
    let currentCard = null;
    let startX, startY;
    let offsetX, offsetY;
    let isGridMode = false;

    initRandomPositions();
    
    albumCards.forEach(card => {
        card.addEventListener('mousedown', startDrag);
        card.addEventListener('dblclick', showAlbumInfo);
        card.style.cursor = 'grab';
    });

    filterCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', handleFilterChange);
    });

    function showAlbumInfo(e) {
        const card = e.currentTarget;
        const imgSrc = card.querySelector('img').src;
        const title = card.getAttribute('data-title');
        const description = card.getAttribute('data-description');
        
        infoCoverImg.src = imgSrc;
        infoCoverImg.classList.add('visible');
        infoTitle.textContent = title;
        infoDescription.textContent = description;
    }

    function initRandomPositions() {
        albumCards.forEach(card => {

            const maxX = container.clientWidth - 120;
            const maxY = container.clientHeight - 120;
            
            const randomX = Math.random() * maxX;
            const randomY = Math.random() * maxY;
            
            card.style.position = 'absolute';
            card.style.left = randomX + 'px';
            card.style.top = randomY + 'px';
            card.style.zIndex = '1';
        });
        
        albumsGrid.style.display = 'block';
        albumsGrid.style.position = 'relative';
    }

    function arrangeInGrid() {
        isGridMode = true;
        albumsGrid.style.display = 'grid';
        albumsGrid.style.position = 'static';
        
        albumCards.forEach(card => {
            card.style.position = 'relative';
            card.style.left = 'auto';
            card.style.top = 'auto';
            card.style.transform = 'none';
        });
    }

    function arrangeRandomly() {
        isGridMode = false;
        albumsGrid.style.display = 'block';
        albumsGrid.style.position = 'relative';
        
        const visibleCards = Array.from(albumCards).filter(card => 
            card.style.display !== 'none'
        );
        
        visibleCards.forEach(card => {
            const maxX = container.clientWidth - 120;
            const maxY = container.clientHeight - 120;
            
            const randomX = Math.random() * maxX;
            const randomY = Math.random() * maxY;
            
            card.style.position = 'absolute';
            card.style.left = randomX + 'px';
            card.style.top = randomY + 'px';
        });
    }

    function handleFilterChange(e) {
        const filterId = e.target.id;
        const isChecked = e.target.checked;

        if (filterId === 'all' && isChecked) {
            filterCheckboxes.forEach(cb => {
                if (cb.id !== 'all') cb.checked = false;
            });
            
            albumCards.forEach(card => {
                card.style.display = 'flex';
            });
            
            arrangeInGrid();
        } 
 
        else if (filterId === 'all' && !isChecked) {
            arrangeRandomly();
        }

        else if (filterId !== 'all' && isChecked) {
    
            document.getElementById('all').checked = false;
            
 
            applyFilters();
            arrangeRandomly();
        }
    
        else if (filterId !== 'all' && !isChecked) {
            applyFilters();
            
            const hasActiveFilters = Array.from(filterCheckboxes).some(cb => 
                cb.id !== 'all' && cb.checked
            );
            
            if (!hasActiveFilters) {
                albumCards.forEach(card => {
                    card.style.display = 'flex';
                });
                arrangeRandomly();
            }
        }
    }

    function applyFilters() {
        const activeFilters = Array.from(filterCheckboxes)
            .filter(cb => cb.id !== 'all' && cb.checked)
            .map(cb => cb.id);

        albumCards.forEach(card => {
            const cardType = card.getAttribute('data-type');
            
            if (activeFilters.length === 0 || activeFilters.includes(cardType)) {
                card.style.display = 'flex';
            } else {
                card.style.display = 'none';
            }
        });
    }

    function startDrag(e) {
        e.preventDefault();
        isDragging = true;
        currentCard = e.currentTarget;
        
        startX = e.clientX;
        startY = e.clientY;
        
        const rect = currentCard.getBoundingClientRect();
        offsetX = startX - rect.left;
        offsetY = startY - rect.top;
        
        currentCard.style.zIndex = '10';
        currentCard.style.cursor = 'grabbing';
        
        document.addEventListener('mousemove', dragCard);
        document.addEventListener('mouseup', stopDrag);
    }

    function dragCard(e) {
        if (!isDragging || !currentCard) return;
        
        e.preventDefault();
        
        const containerRect = container.getBoundingClientRect();
        
        let newX = e.clientX - containerRect.left - offsetX;
        let newY = e.clientY - containerRect.top - offsetY;
        
        const maxX = container.clientWidth - currentCard.offsetWidth;
        const maxY = container.clientHeight - currentCard.offsetHeight;
        
        newX = Math.max(0, Math.min(newX, maxX));
        newY = Math.max(0, Math.min(newY, maxY));
        
        currentCard.style.left = newX + 'px';
        currentCard.style.top = newY + 'px';
    }

    function stopDrag() {
        if (!isDragging || !currentCard) return;
        
        isDragging = false;
        currentCard.style.cursor = 'grab';
        currentCard.style.zIndex = '1';
        
        document.removeEventListener('mousemove', dragCard);
        document.removeEventListener('mouseup', stopDrag);
        
        currentCard = null;
    }
});