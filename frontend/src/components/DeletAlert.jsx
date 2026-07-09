import React from 'react'

export const DeletAlert = ({content, onDelete}) => {
  return (
    <div>
        <p className='text-sm'>{content}</p>

        <div className='flex justify-end mt-6'>
            <button
                type='button'
                className='add-btn add-btn-fill'
                onClick={onDelete}>
                Delete
            </button>
        </div>
    </div>
  )
}
