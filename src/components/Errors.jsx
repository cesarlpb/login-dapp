export const ErrorBox = (title, message) => {
    <div class="alert alert-danger alert-dismissible fade show">
        <strong>{title}</strong> {message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    </div>
}