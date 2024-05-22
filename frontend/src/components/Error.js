import '../styles/DesignComponents.css'

export default function Error(){
    const error = localStorage.getItem('error');
    //localStorage.removeItem('error');
    return(
        <div>
            <h1 className="error-text">{error}</h1>
        </div>
    )
}