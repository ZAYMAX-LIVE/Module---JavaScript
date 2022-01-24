function _openModule(options){ //приват. функция
    const modal = document.createElement('div')
    modal.classList.add('module')
    modal.insertAdjacentHTML('afterbegin', `
    <div class="module-hidden" data-close="true">
    <div class="module-block" style="width: ${options.width}">
        <div class="m-header">
            <span class="m-title">${options.title}</span>
            ${options.closable ? `<span class="m-close" data-close="true">&times;</span>` : ''}
        </div>
        <div class="m-body">
            ${options.content}
        </div>
        <div class="m-footer">
            <button>Ok</button>
            <button>Cancel</button>
        </div>
    </div>
</div>
    `)
    document.body.appendChild(modal) //помещаем модальное окно
    return modal
}

proj.modal = function(options){ //показ модального окна
    const $modal = _openModule(options)
    let destroyed = false //флаг очистки события
    const modal_obj = {
        open(){
            if(destroyed){
                return console.log('Modal is destroyed')
            }
            $modal.classList.add('open')
        },
        close(){
            $modal.classList.remove('open')
            $modal.classList.add('hide') //класс добавления анимации исчезновения
            setTimeout(()=>{
                $modal.classList.remove('hide')
            }, 400)
        },
    }
    const eventClick = e =>{ //функция вызова закрытия окна
        if(e.target.dataset.close){
            modal_obj.close()
        }
    }
    $modal.addEventListener('click', eventClick) //скрытия окна при клике
    return Object.assign(modal_obj, { //расширение обьекта
        destroy(){ //очистка события, убрать элемент из дом дерева
            $modal.parentNode.removeChild($modal) //удаление из dom дерева
            $modal.removeEventListener('click', eventClick) //удаление слушателя событий
            destroyed = true
        }
    })
}