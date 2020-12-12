import React, {memo, useEffect} from 'react'
import {connect} from "react-redux";


const Info = memo(({info: {title}}) => {
    console.log(title)
    useEffect(() => console.log('render Info'))
    return (
        <div>
            <hr/>
            Info about app: {title}
        </div>
    )
})

const mapStateToProps = state => ({
    info: state.fetchStatus.info
})

export default connect(mapStateToProps, null)(Info)
// export default Info