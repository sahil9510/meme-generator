import styles from './Button.module.css';

const Button=(props)=>{

    return(<button onClick={props.onClick} className={`btn btn-primary btn-lg ${styles.button}`}>
        {props.children}
    </button>)
}

export default Button;