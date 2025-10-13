import { useEffect } from "react";
import { clsx } from "keycloakify/tools/clsx";
import { kcSanitize } from "keycloakify/lib/kcSanitize";
import type { TemplateProps } from "keycloakify/login/TemplateProps";
import { useSetClassName } from "keycloakify/tools/useSetClassName";
import { useInitialize } from "keycloakify/login/Template.useInitialize";
import type { KcContext } from "./KcContext";
import type { I18n } from "./i18n";
import logoPngUrl from "../assets/logo.png";
import LanguageSwitcher from "../components/LanguageSwitcher";
import RefreshButton from "../components/RefreshButton";

export default function Template(props: TemplateProps<KcContext, I18n>) {
    const {
        displayInfo = false,
        displayMessage = true,
        headerNode,
        socialProvidersNode = null,
        infoNode = null,
        documentTitle,
        bodyClassName,
        kcContext,
        i18n,
        doUseDefaultCss,
        children
    } = props;

    const { msg } = i18n;

    const { isReadyToRender } = useInitialize({
        kcContext,
        doUseDefaultCss
    });

    useEffect(() => {
        if (!isReadyToRender) {
            return;
        }
        const title = documentTitle ?? msg("loginTitle", kcContext.realm.displayName);
        document.title = typeof title === "string" ? title : kcContext.realm.displayName;
    }, [isReadyToRender, documentTitle, msg, kcContext.realm.displayName]);

    useSetClassName({
        qualifiedName: "html",
        className: kcContext.realm.internationalizationEnabled ? clsx("layout-pf", "login-pf") : clsx("layout-pf", "login-pf", "kc-no-locale")
    });

    useSetClassName({
        qualifiedName: "body",
        className: bodyClassName ?? clsx(kcContext.pageId)
    });

    if (!isReadyToRender) {
        return null;
    }

    return (
        <div className="kc-split-layout">
            {/* Left Side - Form */}
            <div className="kc-form-side">
                <div className="kc-form-container">
                    {/* Logo */}
                    <div className="kc-logo">
                        <img src={logoPngUrl} alt="Musiconnect" />
                    </div>

                    {/* Header */}
                    {headerNode !== undefined ? (
                        <div className="kc-header">{headerNode}</div>
                    ) : (
                        <h1 className="kc-page-heading">{msg("loginTitle", kcContext.realm.displayName)}</h1>
                    )}

                    {/* Messages */}
                    {displayMessage && kcContext.message !== undefined && (
                        <div className={clsx("kc-alert", `kc-alert-${kcContext.message.type}`)}>
                            <span
                                dangerouslySetInnerHTML={{
                                    __html: kcSanitize(kcContext.message.summary)
                                }}
                            />
                        </div>
                    )}

                    {/* Refresh Button - Only on email verification page */}
                    {kcContext.pageId === "login-verify-email.ftl" && (
                        <div className="kc-refresh-section">
                            <RefreshButton i18n={i18n} />
                        </div>
                    )}

                    {/* Required Fields Notice - Hidden */}
                    {/* {displayRequiredFields && (
                        <div className="kc-required-notice">
                            <span className="kc-required-asterisk">*</span> {msg("requiredFields")}
                        </div>
                    )} */}

                    {/* Main Content */}
                    <div className="kc-form-content">{children}</div>

                    {/* Social Providers */}
                    {kcContext.social?.providers?.length > 0 && socialProvidersNode !== null && (
                        <>
                            <div className="kc-divider">
                                <span>OR WITH</span>
                            </div>
                            <div className="kc-social-section kc-social-buttons-only">{socialProvidersNode}</div>
                        </>
                    )}

                    {/* Info Section */}
                    {displayInfo && <div className="kc-info-section">{infoNode}</div>}

                    {/* Language Selector */}
                    <LanguageSwitcher kcContext={kcContext} />
                </div>
            </div>
        </div>
    );
}
