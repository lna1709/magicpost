package web.uet.backend.service.elasticsearch.sync;

import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Service;
import web.uet.backend.document.AccountDocument;
import web.uet.backend.entity.auth.Account;
import web.uet.backend.event.AccountCreateEvent;
import web.uet.backend.mapper.auth.AccountDocumentMapper;
import web.uet.backend.repository.auth.elasticsearch.AccountDocumentRepository;
import web.uet.backend.repository.auth.entity.AccountRepository;

import java.util.UUID;

@Service
public class AccountSyncDataService extends GenericSyncDataService<AccountDocument, Account, UUID,
    AccountDocumentRepository, AccountRepository, AccountDocumentMapper> {
  public AccountSyncDataService(AccountDocumentRepository accountDocumentRepository,
                                AccountRepository accountRepository, AccountDocumentMapper accountDocumentMapper) {
    super(accountDocumentRepository, accountRepository, accountDocumentMapper);
  }

  @EventListener
  public void createAccount(AccountCreateEvent event) {
    Account account = (Account) event.getSource();
    AccountDocument accountDocument = m.toDto(account);
    dr.save(accountDocument);
  }

}
