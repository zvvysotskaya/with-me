import React from 'react'

const CardEmptyFeed = ({ posts }) => {

    return (
        <div>
            <div className='container'>
                <div className="card">
                    <div className="card-header">
                        <div className='col-md-12 d-flex justify-content-between'>
                            <div className='col-md-6 d-flex mt-4'>
                                <p>
                                    Hello, {posts.author.username}! 
                                    There is your feed that is empty yet. You can use <q>
                                        Post List
                                        </q> or <q>Search</q> features in the top of the 
                            menu bar to find posts written by people and follow them.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        )
}
export default CardEmptyFeed;