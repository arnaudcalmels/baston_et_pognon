import { connect } from 'react-redux';

import Detail from '../../components/Detail';

const mapStateToProps= (state) => ({
  item: state.scenario.currentItem,
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(Detail);
