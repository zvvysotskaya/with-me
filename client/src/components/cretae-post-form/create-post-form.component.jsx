import React, { useEffect } from 'react';

import CustomButton from '../../components/button-custom/button-custom.component'

const CreatPostForm = () => {
    // window.location.reload();
    useEffect(() => {
        function one() {
            return new Promise(function (resolve, reject) {
                console.log('Start')
                resolve()
            })
        }
        function windowReload() {
            return new Promise(function (resolve, reject) {
                window.location.reload()
                resolve()
            })
        }
        function three() {
            return new Promise(function (resolve, reject) {
                console.log('Finished')
                resolve()
            })
        }
        async function runAction() {
            try {
                await one()
                await windowReload()
                await three()
            } catch (err) {
                console.log(err)
            }
        }
   // runAction()
    }, [])
    
    function handleSubmit(e) {
        e.preventDefault()
        alert('Hello!!')
    }
    return (
        <div className='container'>
            <div className='row justify-content-center'>
                <div className='col-10 border rounded mt-3'>
                    <form onSubmit={handleSubmit} method='POST'>
                        <div className='form-group'>
                            <input />
                        </div>
                        <div className='form-group'>
                            <textarea />
                        </div>
                        <CustomButton blueBtn type='submit'>Create</CustomButton>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default CreatPostForm;
