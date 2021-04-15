import { connect } from 'react-redux';

import Modal from '../components/Modal';

import { closeModal } from '../actions/auth';

const mapStateToProps= (state) => ({
});

const mapDispatchToProps = (dispatch) => ({
    closeModal: () => {
        dispatch(closeModal());
    }
});


export default connect(mapStateToProps, mapDispatchToProps)(Modal);