const overlay = document.querySelector('.modal_overlay');
const mPop = document.querySelector('.modal_pop');
const modal_message = document.getElementById('modal_message')
const mCancel = document.getElementById('mPop_cancel')
const mContinue = document.getElementById('mPop_continue')
const modal_button_container = document.querySelector('.modal_button_container')
const modal_conatiner = document.querySelector('.modal_conatiner')
const mPop_close_div = document.getElementById('mPop_close_div')
const mPop_close = document.querySelector('.mPop_close')

class open_mPop {
    constructor(message, head, type, url) {
        // Check that message is not empty
        if (!message) {
            // if emtpy quit
            return;
        }
        else {
            this.message = message;
        }
        // Get head title if set
        if (head) {
            this.message = `<h3>${head}</h3>` + this.message;
        }

        // Cast "Body" to modal
        modal_message.innerHTML = this.message;

        // Check if forward url is provided
        if (url) {
            // Get URL
            this.continue = url;
            this.cancel = "Cancel";

            // Set title for buttons
            mCancel.innerText = "Cancel"
            mContinue.innerText = "OK";
            mContinue.style.display = "inline-block";

            // Set bg-color on button (alert = modal_button_alert, otherwise modal_button_confirm)
            if (type == "alert") {
                mContinue.classList.add("modal_button_alert");
            }
            else {
                mContinue.classList.add("modal_button_confirm");
            }

            // add eventlistner for 'OK' button
            mContinue.addEventListener('click', () => {
                // Goto loaction without saving browser history
                location.replace(this.continue);

                // Goto loaction and save browser history
                // location.assign(this.continue)
            });

        }
        else if (type == "info") {
            // select div for bottom buttons and set display to none
            modal_button_container.style.display = "none";

            // Select modal body and make it scrollable
            modal_conatiner.classList.add('modal_scrollable');

            // test for making long text - remove before publish!
            modal_message.innerHTML = modal_message.innerHTML + "<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit labore illum magni quae nesciunt ipsa debitis ex possimus? Sint eligendi nemo corporis voluptatum odit fugiat possimus, harum repellendus libero aliquam voluptatibus veniam velit odio deserunt alias incidunt reprehenderit error officiis. Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit labore illum magni quae nesciunt ipsa debitis ex possimus? Sint eligendi nemo corporis voluptatum odit fugiat possimus, harum repellendus libero aliquam voluptatibus veniam velit odio deserunt alias incidunt reprehenderit error officiis. Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit labore illum magni quae nesciunt ipsa debitis ex possimus? Sint eligendi nemo corporis voluptatum odit fugiat possimus, harum repellendus libero aliquam voluptatibus veniam velit odio deserunt alias incidunt reprehenderit error officiis.</p>";

            // select top button and make it visible
            mPop_close_div.style.display = "block";

            // Add eventlistner to close button
            mPop_close.addEventListener('click', () => {
                close_mPop();
            });

        }
        else if (type == "alert") {
            mCancel.classList.add('modal_button_alert')
            mCancel.style.width = "50%"
            mCancel.innerText = "OK"
        }
        else {
            mCancel.classList.add('modal_button_confirm')
            mCancel.style.width = "50%"
            mCancel.innerText = "OK"
        }

        // Add eventlistners for closing modal
        overlay.addEventListener('click', () => {
            close_mPop();
        });
        mCancel.addEventListener('click', () => {
            close_mPop();
        });
        let Escape_key = (e) => {
            if (e.key === "Escape") {
                close_mPop();
            };
        };
        document.addEventListener("keydown", Escape_key);

        // Display modal
        overlay.style.display = "block";
        mPop.style.display = "block";

        // Set animation timer before start
        setTimeout(() => {
            overlay.style.opacity = "1";
            mPop.style.opacity = "1";
            mPop.style.transform = "scale(1)";
        }, 100);

    }
}

function close_mPop() {

    // Animate closing modual
    mPop.style.opacity = "0"
    overlay.style.opacity = "0"
    mPop.style.transform = "scale(0)";

    // sets timer to hide and reset modual after the closing animation is done
    setTimeout(() => {
        // set modal element to display none
        overlay.style.display = "none";
        mPop.style.display = "none";

        // Reset and empty all elements witin modal
        modal_message.innerHTML = ""
        modal_message.classList.remove('modal_scrollable')
        mContinue.classList.remove('modal_button_alert', 'modal_button_confirm')
        mCancel.innerText = ""
        mCancel.style.width = "100%"
        mContinue.innerText = ""
        mContinue.style.display = "none"
        mPop_cancel.classList.remove('modal_button_alert', 'modal_button_confirm')
        mPop_cancel.innerText = ""
        mPop_close_div.style.display = "none"
        modal_button_container.style.display = "grid"
        modal_conatiner.classList.remove('modal_scrollable')

    }, 800)
}