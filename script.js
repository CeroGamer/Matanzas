document.addEventListener('DOMContentLoaded', function() {
    // Datos de las imágenes de la galería (REEMPLAZA ESTAS URLS CON TUS FOTOS REALES)
    const galleryData = [
        {
            src: 'fotos/DOCENTE.jpg', // Ruta a tu foto 1
            title: 'Bloque Docente',
            description: 'Kevin Sosa pone La Descipcion',
            related: ['fotos/Docente3.jpg' , 'fotos/Docente2.jpg', 'fotos/Docente1.jpg'] // Fotos relacionadas
        },
        {
            src: 'fotos/PC2.jpg', // Ruta a tu foto 2
            title: 'Patio Central',
            description: 'Kevin Sosa pone La Descipcion',
            related: ['fotos/PC5.jpg', 'fotos/PC4.jpg', 'fotos/PC3.jpg' , 'fotos/PC1.jpg']
        },
        {
            src: 'fotos/Aulasdeinformática.jpg', // Ruta a tu foto 3
            title: 'Aulas de Informática',
            description: 'Nuestras modernas aulas equipadas...',
            related: ['fotos/Informatica2.jpg']
        },
        {
            src: 'fotos/Deportes.jpg', // Ruta a tu foto 4
            title: 'Actividades Deportivas',
            description:'Kevin Sosa pone La Descipcion',
            related: ['fotos/Deporte3.jpg', 'fotos/Deporte2.jpg', 'fotos/Deporte1.jpg', 'fotos/Deporte4.jpg']
        },
        {
            src: 'fotos/Eventosculturales.jpg', // Ruta a tu foto 5
            title: 'fotos/Eventos Culturales',
            description: 'Kevin Sosa pone La Descipcion',
            related: ['fotos/Evento1.jpg', 'fotos/Evento2.jpg', 'fotos/Evento3.jpg', 'fotos/Evento4.jpg']
        },
        {
            src: 'fotos/Graduación.jpg', // Ruta a tu foto 6
            title: 'Ceremonia de Graduación',
            description: 'Kevin Sosa pone La Descipcion',
            related: ['fotos/Graduación4.jpg', 'fotos/Graduación3.jpg', 'fotos/Graduación2.jpg', 'fotos/Graduación1.jpg']
        }
    ];

    // Crear la galería mejorada
    const galleryGrid = document.querySelector('.gallery-grid');
    
    galleryData.forEach((item, index) => {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';
        galleryItem.style.animationDelay = `${index * 0.1}s`;
        
        galleryItem.innerHTML = `
            <img src="${item.src}" alt="${item.title}" loading="lazy">
            <div class="img-info">
                <h3>${item.title}</h3>
                <p>${item.description.substring(0, 80)}...</p>
                <div class="view-more">Click para ver más <i class="fas fa-arrow-right"></i></div>
            </div>
        `;
        
        galleryItem.addEventListener('click', () => openModal(item));
        galleryGrid.appendChild(galleryItem);
    });

    // Añadir elementos flotantes decorativos
    addFloatingElements();

    // Funcionalidad del modal mejorada
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    const modalInfo = document.getElementById('modalInfo');
    const closeBtn = document.querySelector('.close-btn');

    function openModal(item) {
        modal.style.display = 'block';
        modalImg.src = item.src;
        modalImg.alt = item.title;
        
        // Información principal + fotos relacionadas
        modalInfo.innerHTML = `
            <h2>${item.title}</h2>
            <p>${item.description}</p>
            <div class="photo-meta">
                <span><i class="fas fa-camera"></i> EMCC Matanzas</span>
                <span><i class="fas fa-user"></i> Archivo Histórico</span>
            </div>
            
            <div class="related-photos">
                <h3>Más Fotos</h3>
                <div class="related-grid"></div>
            </div>
        `;
        
        // Mostrar fotos relacionadas
        const relatedGrid = modalInfo.querySelector('.related-grid');
        item.related.forEach(relatedPhoto => {
            const relatedItem = document.createElement('div');
            relatedItem.className = 'related-item';
            relatedItem.innerHTML = `<img src="${relatedPhoto}" alt="Foto relacionada">`;
            relatedItem.addEventListener('click', (e) => {
                e.stopPropagation();
                // Encontrar la foto relacionada en galleryData
                const fullPhoto = galleryData.find(img => img.src === relatedPhoto) || 
                                 { src: relatedPhoto, title: 'Foto relacionada', description: 'Imagen adicional de la EMCC' };
                openModal(fullPhoto);
            });
            relatedGrid.appendChild(relatedItem);
        });
        
        document.body.style.overflow = 'hidden';
        modalImg.style.opacity = '0';
        setTimeout(() => {
            modalImg.style.transition = 'opacity 0.6s ease';
            modalImg.style.opacity = '1';
        }, 100);
    }

    // ... (el resto de las funciones permanecen igual)
    closeBtn.addEventListener('click', closeModal);

    function closeModal() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            closeModal();
        }
    });

    function addFloatingElements() {
        const header = document.querySelector('.header');
        const floatingElements = document.createElement('div');
        floatingElements.className = 'floating-elements';
        
        for (let i = 0; i < 15; i++) {
            const element = document.createElement('div');
            element.className = 'floating-element';
            const size = Math.random() * 20 + 5;
            element.style.width = `${size}px`;
            element.style.height = `${size}px`;
            element.style.left = `${Math.random() * 100}%`;
            element.style.top = `${Math.random() * 100}%`;
            element.style.opacity = Math.random() * 0.4 + 0.1;
            element.style.animationDelay = `${Math.random() * 5}s`;
            element.style.animationDuration = `${Math.random() * 20 + 10}s`;
            floatingElements.appendChild(element);
        }
        header.appendChild(floatingElements);
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.gallery-item').forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(item);
    });
});
// Crear botón dinámicamente
const botonCutre = document.createElement('button');
botonCutre.id = 'botonCutreJS';
botonCutre.textContent = '¡Ver Más!';

// Estilos estáticos con efecto olas
Object.assign(botonCutre.style, {
    position: 'fixed',
    bottom: '80px',
    right: '20px',
    background: 'linear-gradient(45deg, #0066ff, #00aaff)',
    color: 'white',
    border: 'none',
    padding: '15px 30px',
    borderRadius: '30px',
    cursor: 'pointer',
    zIndex: '1000',
    fontSize: '18px',
    fontWeight: 'bold',
    boxShadow: '0 8px 20px rgba(0, 102, 255, 0.4)',
    overflow: 'hidden',
    transition: 'all 0.3s ease',
    userSelect: 'none'
});

// Efecto "olas de mar" en el fondo del botón
const olas = document.createElement('div');
Object.assign(olas.style, {
    position: 'absolute',
    bottom: '0',
    left: '0',
    width: '200%',
    height: '100%',
    background: 'linear-gradient(90deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.3) 50%, rgba(255,255,255,0.1) 100%)',
    animation: 'olasAnimation 6s linear infinite',
    opacity: '0.5'
});
botonCutre.appendChild(olas);

// Efecto "touch" al presionar
botonCutre.addEventListener('mousedown', () => {
    botonCutre.style.transform = 'translateY(4px)';
    botonCutre.style.boxShadow = '0 2px 10px rgba(0, 102, 255, 0.2)';
    
    // Efecto de onda al hacer clic
    const ripple = document.createElement('span');
    ripple.style.position = 'absolute';
    ripple.style.borderRadius = '50%';
    ripple.style.backgroundColor = 'rgba(255, 255, 255, 0.7)';
    ripple.style.transform = 'scale(0)';
    ripple.style.animation = 'ripple 0.6s linear';
    ripple.style.pointerEvents = 'none';
    
    botonCutre.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
});

botonCutre.addEventListener('mouseup', () => {
    botonCutre.style.transform = 'translateY(0)';
    botonCutre.style.boxShadow = '0 8px 20px rgba(0, 102, 255, 0.4)';
});

// Redirección
botonCutre.addEventListener('click', () => {
    setTimeout(() => {
        window.location.href = 'index1.html';
    }, 300);
});

// Añadir estilos de animación
const style = document.createElement('style');
style.textContent = `
    @keyframes olasAnimation {
        0% { transform: translateX(0); }
        100% { transform: translateX(-50%); }
    }
    @keyframes ripple {
        to { transform: scale(4); opacity: 0; }
    }
    #botonCutreJS:hover {
        background: linear-gradient(45deg, #0055cc, #0088cc);
    }
`;
document.head.appendChild(style);

// Insertar botón
document.body.appendChild(botonCutre);
botonCutre.addEventListener('click', () => {
      new Audio('https://assets.mixkit.co/sfx/preview/mixkit-arcade-game-jump-coin-216.mp3').play().catch(e => {});
  });