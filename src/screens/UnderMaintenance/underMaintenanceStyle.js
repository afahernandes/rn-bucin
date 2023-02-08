import {StyleSheet} from 'react-native';
import appTheme from '../../constants/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
  headerTitle: {
    fontWeight: 'bold',
    fontSize: 19,
  },
  projectsBody: {
    flex: 1,
    backgroundColor: appTheme.BACKGROUND,
  },

  rowJustifyBetween: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  textTitle: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 5,
    marginTop: 20,
    color: appTheme.DEFAULT,
  },
  textStatus: {
    fontSize: 18,
    fontWeight: '700',
    color: appTheme.DEFAULT,
  },
  textSubTitle: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 3,
    color: appTheme.BLACK,
  },
  button: {
    height: 40,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  textButton: {
    color: appTheme.WHITE,
    fontWeight: '700',
  },
  containerbottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default styles;
