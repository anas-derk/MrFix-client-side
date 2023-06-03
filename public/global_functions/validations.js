const isEmail = (email) => {
    return email.match(/[^\s@]+@[^\s@]+\.[^\s@]+/);
}

function isImage(file) {
    return file.type === "image/png" || file.type === "image/jpeg";
}

const isValidPassword = (password) => {
    
}

const inputValuesValidation = (inputs) => {
    // تعريف المصفوفة التي ستخزن الأخطاء
    let errorsObject = {};
    // إنشاء حلقة للمرور على كل المدخلات المرسلة إلى التابع وعمل التحقق المطلوب بناء على القواعد المرسلة
    for (let input of inputs) {
        // تخزين القواعد الخاصة بالمُدخل في متغير لاستخدامه لاحقاً
        let inputRules = input.rules;
        // التحقق من كون القاعدة داخل كائن القواعد موجودة 
        if (typeof inputRules.isRequired !== "undefined") {
            // التحقق من أنّ القاعدة محققة ، وفي حالة لم تكن محققة فإننا نضيف الخطأ إلى مصفوفة الأخطاء
            if (input.value.length === 0) {
                errorsObject[input.name] = inputRules.isRequired.msg;
                // في حالة وجود خطأ نقوم بتجاهل كل التعليمات اللاحقة داخل التكرار الحالي للحلقة والانتقال إلى التكرار التالي
                continue;
            }
        }
        // التحقق من كون القاعدة داخل كائن القواعد موجودة 
        if (typeof inputRules.isEmail !== "undefined") {
            // التحقق من أنّ القاعدة محققة ، وفي حالة لم تكن محققة فإننا نضيف الخطأ إلى مصفوفة الأخطاء
            if (!isEmail(input.value)) {
                errorsObject[input.name] = inputRules.isEmail.msg;
                // في حالة وجود خطأ نقوم بتجاهل كل التعليمات اللاحقة داخل التكرار الحالي للحلقة والانتقال إلى التكرار التالي
                continue;
            }
        }
        // التحقق من كون القاعدة داخل كائن القواعد موجودة 
        if (typeof inputRules.isEmailOrNumber !== "undefined") {
            // التحقق من أنّ القاعدة محققة ، وفي حالة لم تكن محققة فإننا نضيف الخطأ إلى مصفوفة الأخطاء
            if (!isEmail(input.value) && isNaN(input.value)) {
                errorsObject[input.name] = inputRules.isEmailOrNumber.msg;
                // في حالة وجود خطأ نقوم بتجاهل كل التعليمات اللاحقة داخل التكرار الحالي للحلقة والانتقال إلى التكرار التالي
                continue;
            }
        }
        // التحقق من كون القاعدة داخل كائن القواعد موجودة 
        if (typeof inputRules.isImage !== "undefined") {
            // التحقق من أنّ القاعدة محققة ، وفي حالة لم تكن محققة فإننا نضيف الخطأ إلى مصفوفة الأخطاء
            if (!isImage(input.value)) {
                errorsObject[input.name] = inputRules.isImage.msg;
                // في حالة وجود خطأ نقوم بتجاهل كل التعليمات اللاحقة داخل التكرار الحالي للحلقة والانتقال إلى التكرار التالي
                continue;
            }
        }
        // التحقق من كون القاعدة داخل كائن القواعد موجودة 
        if (typeof inputRules.minLength !== "undefined") {
           // التحقق من أنّ القاعدة محققة ، وفي حالة لم تكن محققة فإننا نضيف الخطأ إلى مصفوفة الأخطاء
            if (input.value.length < inputRules.minLength.value) {
                errorsObject[input.name] = inputRules.minLength.msg;
                // في حالة وجود خطأ نقوم بتجاهل كل التعليمات اللاحقة داخل التكرار الحالي للحلقة والانتقال إلى التكرار التالي
                continue;
            }
        }
        // التحقق من كون القاعدة داخل كائن القواعد موجودة 
        if (typeof inputRules.maxLength !== "undefined") {
            // التحقق من أنّ القاعدة محققة ، وفي حالة لم تكن محققة فإننا نضيف الخطأ إلى مصفوفة الأخطاء
            if (input.value.length > inputRules.maxLength.value) {
                errorsObject[input.name] = inputRules.maxLength.msg;
                // في حالة وجود خطأ نقوم بتجاهل كل التعليمات اللاحقة داخل التكرار الحالي للحلقة والانتقال إلى التكرار التالي
                continue;
            }
        }
        // التحقق من كون القاعدة داخل كائن القواعد موجودة 
        if (typeof inputRules.isMatch !== "undefined") {
            // التحقق من أنّ القاعدة محققة ، وفي حالة لم تكن محققة فإننا نضيف الخطأ إلى مصفوفة الأخطاء
            if (input.value != inputRules.isMatch.value) {
                errorsObject[input.name] = inputRules.isMatch.msg;
                // في حالة وجود خطأ نقوم بتجاهل كل التعليمات اللاحقة داخل التكرار الحالي للحلقة والانتقال إلى التكرار التالي
                continue;
            }
        }
    }
    return errorsObject;
}

export default { isEmail,  inputValuesValidation };