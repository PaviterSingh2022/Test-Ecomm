import React, { useContext, useEffect, useState } from 'react'


function AdminColumns() {

    return (
        <>        <thead>
            <tr>
                <th>
                    CATEGORY
                </th>
                <th>
                    PRODUCTS
                </th>
                <th>
                    NAME OF PRODUCT
                </th>
                <th>
                    PRICE
                </th>
                <th>
                    QUANTITY
                </th>
                <th>
                    DESCRIPTION
                </th>
                <th>
                    Actions
                </th>
            </tr>
        </thead>
        </>

    )
}

export default AdminColumns;