const isEmail = (email) => {
    return email.match(/[^\s@]+@[^\s@]+\.[^\s@]+/);
}

const isValidPassword = (password) => {
    
}

const inputValuesValidation = (inputs) => {
    // تعريف المصفوفة التي ستخزن الأخطاء
    let errorList = [];
    // إنشاء حلقة للمرور على كل المدخلات المرسلة إلى التابع وعمل التحقق المطلوب بناء على القواعد المرسلة
    for (let input of inputs) {
        // تخزين القواعد الخاصة بالمُدخل في متغير لاستخدامه لاحقاً
        let inputRules = input.rules;
        // التحقق من كون القاعدة داخل كائن القواعد موجودة 
        if (typeof inputRules.isRequired !== "undefined") {
            // التحقق من أنّ القاعدة محققة ، وفي حالة لم تكن محققة فإننا نضيف الخطأ إلى مصفوفة الأخطاء
            if (input.value.length === 0) {
                errorList[input.name] = inputRules.isRequired.msg;
                // في حالة وجود خطأ نقوم بتجاهل كل التعليمات اللاحقة داخل التكرار الحالي للحلقة والانتقال إلى التكرار التالي
                continue;
            }
        }
        // التحقق من كون القاعدة داخل كائن القواعد موجودة 
        if (typeof inputRules.isEmail !== "undefined") {
            // التحقق من أنّ القاعدة محققة ، وفي حالة لم تكن محققة فإننا نضيف الخطأ إلى مصفوفة الأخطاء
            if (!isEmail(input.value)) {
                errorList[input.name] = inputRules.isEmail.msg;
                // في حالة وجود خطأ نقوم بتجاهل كل التعليمات اللاحقة داخل التكرار الحالي للحلقة والانتقال إلى التكرار التالي
                continue;
            }
        }
        // التحقق من كون القاعدة داخل كائن القواعد موجودة 
        if (typeof inputRules.minLength !== "undefined") {
           // التحقق من أنّ القاعدة محققة ، وفي حالة لم تكن محققة فإننا نضيف الخطأ إلى مصفوفة الأخطاء
            if (input.value.length < inputRules.minLength.value) {
                errorList[input.name] = inputRules.minLength.msg;
                // في حالة وجود خطأ نقوم بتجاهل كل التعليمات اللاحقة داخل التكرار الحالي للحلقة والانتقال إلى التكرار التالي
                continue;
            }
        }
        // التحقق من كون القاعدة داخل كائن القواعد موجودة 
        if (typeof inputRules.maxLength !== "undefined") {
            // التحقق من أنّ القاعدة محققة ، وفي حالة لم تكن محققة فإننا نضيف الخطأ إلى مصفوفة الأخطاء
            if (input.value.length > inputRules.maxLength.value) {
                errorList[input.name] = inputRules.maxLength.msg;
                // في حالة وجود خطأ نقوم بتجاهل كل التعليمات اللاحقة داخل التكرار الحالي للحلقة والانتقال إلى التكرار التالي
                continue;
            }
        }
        // التحقق من كون القاعدة داخل كائن القواعد موجودة 
        if (typeof inputRules.isMatch !== "undefined") {
            // التحقق من أنّ القاعدة محققة ، وفي حالة لم تكن محققة فإننا نضيف الخطأ إلى مصفوفة الأخطاء
            if (input.value != inputRules.isMatch.value) {
                errorList[input.name] = inputRules.isMatch.msg;
                // في حالة وجود خطأ نقوم بتجاهل كل التعليمات اللاحقة داخل التكرار الحالي للحلقة والانتقال إلى التكرار التالي
                continue;
            }
        }
    }
    return errorList;
}

export default { isEmail,  inputValuesValidation };